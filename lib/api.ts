import { headers } from 'next/headers';

export interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  manufacturer: string;
  specifications: Array<{name: string; value: string}>;
  fulfillmentType: string;
  numberOfReviews: number;
  sellerName: string;
  canonicalUrl: string;
  longDescription: string;
  productHighlights: string[];
  badges: string[];
}

interface ApiResponse {
  itemsV2: any[];
  totalPages: number;
}

interface ReviewResponse {
  averageOverallRating: number;
  customerReviews: Array<{
    authorId: string;
    reviewId: string;
    rating: number;
    reviewTitle: string;
    reviewText: string;
    reviewSubmissionTime: string;
    userNickname: string;
    recommended: boolean;
    positiveFeedback: number;
    negativeFeedback: number;
  }>;
}

const API_CONFIG = {
  host: 'walmart2.p.rapidapi.com',
  key: 'bab463f57ramshc7293cd0876d082p12ce00jsn6cf3ace12ff3',
  baseUrl: 'https://walmart2.p.rapidapi.com'
};

const getApiHeaders = () => ({
  'X-RapidAPI-Key': API_CONFIG.key,
  'X-RapidAPI-Host': API_CONFIG.host,
  'Content-Type': 'application/json'
});

const transformArticleData = (item: any): Article => ({
  id: item.usItemId,
  title: item.name,
  description: item.shortDescription || 'No description available',
  price: item.priceInfo?.currentPrice || 0,
  rating: item.averageRating || 0,
  image: item.imageInfo?.thumbnailUrl || '/placeholder.svg',
  category: item.category || 'Uncategorized',
  manufacturer: item.manufacturerName || 'Unknown Manufacturer',
  specifications: item.specifications || [],
  fulfillmentType: item.fulfillmentType || 'Standard',
  numberOfReviews: item.numberOfReviews || 0,
  sellerName: item.sellerName || 'Unknown Seller',
  canonicalUrl: item.canonicalUrl || '',
  longDescription: item.longDescription || '',
  productHighlights: item.productHighlights || [],
  badges: item.badges || []
});

export async function fetchArticles(query: string = 'artificial intelligence'): Promise<Article[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/searchV2?query=${encodeURIComponent(query)}`,
      { headers: getApiHeaders() }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.itemsV2.map(transformArticleData);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const [productResponse, descriptionResponse] = await Promise.all([
      fetch(`${API_CONFIG.baseUrl}/searchV2?query=id:${id}`, { headers: getApiHeaders() }),
      fetch(`${API_CONFIG.baseUrl}/productDescription?usItemId=${id}`, { headers: getApiHeaders() })
    ]);

    if (!productResponse.ok || !descriptionResponse.ok) {
      throw new Error('Failed to fetch article data');
    }

    const productData = await productResponse.json();
    const descriptionData = await descriptionResponse.json();

    const item = productData.itemsV2[0];
    return {
      ...transformArticleData(item),
      longDescription: descriptionData.longDescription || '',
      productHighlights: descriptionData.productHighlights || []
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function fetchArticleReviews(id: string): Promise<ReviewResponse> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/productReviews?usItemId=${id}&page=1&sort=RELEVANT`,
      { headers: getApiHeaders() }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      averageOverallRating: data.averageOverallRating || 0,
      customerReviews: data.customerReviews || []
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      averageOverallRating: 0,
      customerReviews: []
    };
  }
}