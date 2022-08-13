import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId:'6lz1bfoe',
    dataset:'production',
    apiVersion:'2022-07-12',
    useCdn: true,
    // token: process.env.SANITY_TOKEN
    token: 'skV66RobJ6QMYgmPdGx8rjOLDjgd1BWqZBa2VFpeoiQiHW0ZkI3UVfXLiyCr7S2egPNEzaAlpo9ViLUAEdlQ8dkbx2OGOdJALcjSS74JCkqIUPSgJ1vpoczTwSmPLPPFOFYw5UZVOogoMOBwMymqiVDHeXhQgljyqbz4lWPCDtaAlwroqJGr'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)