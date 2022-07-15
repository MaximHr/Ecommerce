export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name:'image',
            title:'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true
            }
        },
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug',
            options: {
                source:'title',
                maxLength:100
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'number'
        },
        {
            name: 'stars',
            title: 'Stars (1-5)',
            type: 'number'
        },
        {
            name: 'sort',
            title: 'Type (clothing or accessories)',
            type: 'string'
        }
    ]
}