export type UUID = string;
export type KeyValue = { key: string, value: string };
export type BaseResponse<T> = { correlationId: string; } & T;
export type Organization = {
  id: UUID;
  pricesVatInclusive: boolean | null;
  loyaltyDiscountAffectsVat: boolean | null;
  version: string | null;
  addressFormatType: 'Legacy' | 'City' | 'International' | 'IntNoPostcode' | null;
  isAnonymousGuestsAllowed: boolean | null;
  name: string | null;
  country: string | null;
  restaurantAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  useUaeAddressingSystem: boolean | null;
  countryPhoneCode: string | null;
  marketingSourceRequiredInDelivery: string | null;
  defaultDeliveryCityId: UUID | null;
  deliveryCityIds: string[] | null;
  deliveryServiceType: 'CourierOnly' | 'SelfServiceOnly' | 'CourierAndSelfService' | null;
  defaultCallCenterPaymentTypeId: UUID | null;
  orderItemCommentEnabled: boolean | null;
  isConfirmationEnabled: boolean | null;
  confirmAllowedIntervalInMinutes: number | null;
  addressLookup: ('DaData' | 'GetAddress')[] | null;
  useBusinessHoursAndMapping: boolean | null;
  externalData: KeyValue[] | null;
}
export type Terminal = {
  id: UUID;
  organizationId: UUID;
  name: string;
  timeZone: string;
  readonly: KeyValue[] | null;
}