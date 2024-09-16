import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
            priority: 0.6,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
            priority: 0.6,
        },
    ]
}