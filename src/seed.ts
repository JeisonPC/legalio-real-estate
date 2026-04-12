import { getPayload } from 'payload'
import type { RequiredDataFromCollectionSlug } from 'payload'
import config from './payload.config'

const seed = async () => {
    const payload = await getPayload({ config })

    console.log('🌱 Seeding database...')

    const adminUser: RequiredDataFromCollectionSlug<'users'> = {
        email: 'admin@legalio.com.co',
        password: 'Admin123!',
        role: 'admin',
    }

    await payload.create({
        collection: 'users',
        data: adminUser,
    })

    const colombia = await payload.create({
        collection: 'countries',
        data: {
            name: 'Colombia',
            code: 'CO',
            slug: 'colombia',
            isActive: true,
        },
    })

    const valle = await payload.create({
        collection: 'departments',
        data: {
            name: 'Valle del Cauca',
            slug: 'valle-del-cauca',
            country: colombia.id,
            isActive: true,
        },
    })

    const cundinamarca = await payload.create({
        collection: 'departments',
        data: {
            name: 'Cundinamarca',
            slug: 'cundinamarca',
            country: colombia.id,
            isActive: true,
        },
    })

    const antioquia = await payload.create({
        collection: 'departments',
        data: {
            name: 'Antioquia',
            slug: 'antioquia',
            country: colombia.id,
            isActive: true,
        },
    })

    const cali = await payload.create({
        collection: 'cities',
        data: {
            name: 'Cali',
            slug: 'cali',
            department: valle.id,
            isActive: true,
            location: [-76.532, 3.4516],
        },
    })

    const palmira = await payload.create({
        collection: 'cities',
        data: {
            name: 'Palmira',
            slug: 'palmira',
            department: valle.id,
            isActive: true,
            location: [-76.3036, 3.5394],
        },
    })

    const bogota = await payload.create({
        collection: 'cities',
        data: {
            name: 'Bogotá',
            slug: 'bogota',
            department: cundinamarca.id,
            isActive: true,
            location: [-74.0721, 4.711],
        },
    })

    const medellin = await payload.create({
        collection: 'cities',
        data: {
            name: 'Medellín',
            slug: 'medellin',
            department: antioquia.id,
            isActive: true,
            location: [-75.5636, 6.2442],
        },
    })

    const propiedades: RequiredDataFromCollectionSlug<'properties'>[] = [
        {
            title: 'Casa campestre en Ciudad Jardín',
            address: 'Cra. 100 #16-80, Ciudad Jardín, Cali',
            city: cali.id,
            price: 850000000,
            propertyType: 'casa',
            businessType: 'venta',
            featured: true,
            bedrooms: 4,
            bathrooms: 3,
            area: 220,
            garages: 2,
            estrato: '6',
            imgWidth: 800,
            imgHeight: 600,
            description:
                'Hermosa casa en exclusivo sector de Ciudad Jardín con amplios espacios y jardín privado.',
            features: [
                { value: 'Piscina' },
                { value: 'Jardín' },
                { value: 'Terraza' },
                { value: 'Cuarto de servicio' },
            ],
        },
        {
            title: 'Apartamento moderno en El Poblado',
            address: 'Cl. 10 #43E-31, El Poblado, Medellín',
            city: medellin.id,
            price: 620000000,
            propertyType: 'apartamento',
            businessType: 'venta',
            featured: true,
            bedrooms: 3,
            bathrooms: 2,
            area: 110,
            garages: 1,
            estrato: '6',
            imgWidth: 800,
            imgHeight: 600,
            description:
                'Moderno apartamento en el corazón de El Poblado con vista panorámica a la ciudad.',
            features: [
                { value: 'Gimnasio' },
                { value: 'Terraza' },
                { value: 'Seguridad 24h' },
            ],
        },
        {
            title: 'Apartamento en arriendo en Chapinero',
            address: 'Cra. 7 #63-14, Chapinero, Bogotá',
            city: bogota.id,
            price: 2800000,
            propertyType: 'apartamento',
            businessType: 'arriendo',
            featured: false,
            bedrooms: 2,
            bathrooms: 1,
            area: 65,
            garages: 1,
            estrato: '4',
            imgWidth: 800,
            imgHeight: 600,
            description:
                'Cómodo apartamento en arriendo en el sector financiero de Chapinero.',
            features: [{ value: 'Portería' }, { value: 'Lavandería' }],
        },
        {
            title: 'Casa en arriendo en Palmira Norte',
            address: 'Cl. 30 #22-15, Barrio Norte, Palmira',
            city: palmira.id,
            price: 1500000,
            propertyType: 'casa',
            businessType: 'arriendo',
            featured: false,
            bedrooms: 3,
            bathrooms: 2,
            area: 140,
            garages: 1,
            estrato: '3',
            imgWidth: 800,
            imgHeight: 600,
            description: 'Amplia casa en arriendo con patio interior y zona de ropas.',
            features: [{ value: 'Patio' }, { value: 'Zona de ropas' }],
        },
        {
            title: 'Oficina en el centro financiero de Bogotá',
            address: 'Cra. 11 #93-53, Chicó, Bogotá',
            city: bogota.id,
            price: 4500000,
            propertyType: 'oficina',
            businessType: 'arriendo',
            featured: true,
            bedrooms: 0,
            bathrooms: 2,
            area: 90,
            garages: 2,
            estrato: '6',
            imgWidth: 800,
            imgHeight: 600,
            description:
                'Oficina ejecutiva en edificio AAA con todas las amenidades corporativas.',
            features: [
                { value: 'Recepción' },
                { value: 'Sala de juntas' },
                { value: 'Aire acondicionado' },
            ],
        },
        {
            title: 'Local comercial en el centro de Cali',
            address: 'Cra. 5 #15-20, Centro, Cali',
            city: cali.id,
            price: 3200000,
            propertyType: 'local',
            businessType: 'arriendo',
            featured: false,
            bedrooms: 0,
            bathrooms: 1,
            area: 55,
            garages: 0,
            estrato: '3',
            imgWidth: 800,
            imgHeight: 600,
            description:
                'Local en esquina con gran flujo peatonal, ideal para comercio al detal.',
            features: [{ value: 'Vitrina' }, { value: 'Bodega' }],
        },
    ]

    for (const data of propiedades) {
        await payload.create({
            collection: 'properties',
            data,
        })
    }

    console.log('✅ Seed completo')
    process.exit(0)
}

seed()