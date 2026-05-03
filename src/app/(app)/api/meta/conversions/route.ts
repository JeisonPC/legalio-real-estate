import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const META_PIXEL_ID = process.env.META_PIXEL_ID
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

const GRAPH_VERSION = 'v25.0'

function sha256(value?: string | null) {
  if (!value) return undefined

  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex')
}

function cleanPhone(value?: string | null) {
  if (!value) return undefined
  return value.replace(/\D/g, '')
}

export async function POST(req: NextRequest) {
  try {
    if (!META_PIXEL_ID || !META_CAPI_TOKEN) {
      return NextResponse.json(
        { error: 'Meta CAPI env vars are missing' },
        { status: 500 },
      )
    }

    const body = await req.json()

    const {
      eventName,
      eventId,
      eventSourceUrl,
      email,
      phone,
      firstName,
      lastName,
      city,
      country = 'co',
      customData,
    } = body

    if (!eventName || !eventId || !eventSourceUrl) {
      return NextResponse.json(
        { error: 'eventName, eventId and eventSourceUrl are required' },
        { status: 400 },
      )
    }

    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIpAddress =
      forwardedFor?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      undefined

    const clientUserAgent = req.headers.get('user-agent') || undefined

    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value

    const normalizedPhone = cleanPhone(phone)

    const userData = {
      ...(email ? { em: [sha256(email)] } : {}),
      ...(normalizedPhone ? { ph: [sha256(normalizedPhone)] } : {}),
      ...(firstName ? { fn: [sha256(firstName)] } : {}),
      ...(lastName ? { ln: [sha256(lastName)] } : {}),
      ...(city ? { ct: [sha256(city)] } : {}),
      ...(country ? { country: [sha256(country)] } : {}),
      ...(clientIpAddress ? { client_ip_address: clientIpAddress } : {}),
      ...(clientUserAgent ? { client_user_agent: clientUserAgent } : {}),
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: 'website',
          event_source_url: eventSourceUrl,
          user_data: userData,
          custom_data: customData || {},
        },
      ],
      ...(META_TEST_EVENT_CODE
        ? { test_event_code: META_TEST_EVENT_CODE }
        : {}),
    }

    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI error:', result)

      return NextResponse.json(
        { error: 'Meta CAPI request failed', details: result },
        { status: response.status },
      )
    }

    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error('Meta CAPI internal error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}