import type { CollectionConfig } from 'payload'

export const Leases: CollectionConfig = {
    slug: 'leases',
    labels: {
        singular: 'Contrato de arrendamiento',
        plural: 'Contratos de arrendamiento',
    },
    admin: {
        useAsTitle: 'leaseCode',
        defaultColumns: ['leaseCode', 'tenant', 'property', 'status', 'startDate', 'endDate'],
    },
    access: {
        read: ({ req }) => {
            const user = req.user

            if (!user) return false

            if (user.role === 'admin') return true

            return {
                tenant: {
                    equals: user.id,
                },
            }
        },
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
        delete: ({ req }) => req.user?.role === 'admin',
    },
    fields: [
        {
            name: 'leaseCode',
            label: 'Código del contrato',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'property',
            label: 'Propiedad',
            type: 'relationship',
            relationTo: 'properties',
            required: true,
        },
        {
            name: 'owner',
            label: 'Propietario',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            filterOptions: {
                role: {
                    equals: 'owner',
                },
            },
        },
        {
            name: 'tenant',
            label: 'Arrendatario',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            filterOptions: {
                role: {
                    equals: 'tenant',
                },
            },
        },
        {
            name: 'startDate',
            label: 'Fecha de inicio',
            type: 'date',
            required: true,
        },
        {
            name: 'endDate',
            label: 'Fecha de finalización',
            type: 'date',
            required: true,
        },
        {
            name: 'monthlyRent',
            label: 'Canon mensual',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'depositValue',
            label: 'Depósito',
            type: 'number',
            min: 0,
        },
        {
            name: 'status',
            label: 'Estado',
            type: 'select',
            required: true,
            defaultValue: 'active',
            options: [
                { label: 'Activo', value: 'active' },
                { label: 'Finalizado', value: 'ended' },
                { label: 'Suspendido', value: 'suspended' },
                { label: 'En mora', value: 'late' },
            ],
        },
        {
            name: 'notes',
            label: 'Observaciones',
            type: 'textarea',
        },
    ],
}