import prisma from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeListins = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))
    
    return safeListins
  } catch (error: any) { 
    throw new Error(error)
  }
}