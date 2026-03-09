// src/data/offers.ts

export interface Offer {
  id: string;
  requestId: string;
  supplierEmail: string;
  supplierName?: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt?: string;
  supplierCompany?: string;
  supplierFullName?: string
  status?: 'pending' | 'accepted' | 'rejected';
}

const OFFERS_KEY = 'offers';

// Вспомогательная функция для загрузки
function loadOffers(): Offer[] {
  try {
    return JSON.parse(localStorage.getItem(OFFERS_KEY) || '[]');
  } catch {
    return [];
  }
}

// Вспомогательная функция для сохранения
function saveOffers(offers: Offer[]): void {
  localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));
  // Вызываем событие для обновления всех компонентов
  window.dispatchEvent(new CustomEvent('offers-updated'));
}

// Получить все предложения
export const listAllOffers = (): Offer[] => {
  return loadOffers();
};

// Получить предложение по ID
export const getOfferById = (offerId: string): Offer | null => {
  const offers = loadOffers();
  return offers.find(offer => offer.id === offerId) || null;
};

// Получить предложения по ID заявки
export const listOffersByRequestId = (requestId: string): Offer[] => {
  const offers = loadOffers();
  return offers.filter(offer => offer.requestId === requestId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Получить предложения поставщика для конкретной заявки
export const getOffersBySupplierForRequest = (supplierEmail: string, requestId: string): Offer[] => {
  if (!supplierEmail || !requestId) return [];

  const offers = loadOffers();
  return offers.filter(offer =>
    offer.requestId === requestId &&
    offer.supplierEmail?.toLowerCase() === supplierEmail.toLowerCase()
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Получить все предложения поставщика
export const getOffersBySupplier = (supplierEmail: string): Offer[] => {
  if (!supplierEmail) return [];

  const offers = loadOffers();
  return offers.filter(offer =>
    offer.supplierEmail?.toLowerCase() === supplierEmail.toLowerCase()
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Создать новое предложение
export const createOffer = (offer: Offer): Offer => {
  const offers = loadOffers();
  offers.push(offer);
  saveOffers(offers);
  return offer;
};

// Обновить предложение
export const updateOffer = (offerId: string, updatedData: Partial<Offer>): Offer | null => {
  const offers = loadOffers();
  const index = offers.findIndex(o => o.id === offerId);

  if (index !== -1) {
    offers[index] = {
      ...offers[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveOffers(offers);
    return offers[index];
  }
  return null;
};

// Удалить предложение
export const deleteOffer = (offerId: string): boolean => {
  const offers = loadOffers();
  const filtered = offers.filter(o => o.id !== offerId);
  saveOffers(filtered);
  return true;
};

// Подсчитать количество предложений по заявке
export const countOffersByRequestId = (requestId: string): number => {
  const offers = loadOffers();
  return offers.filter(offer => offer.requestId === requestId).length;
};