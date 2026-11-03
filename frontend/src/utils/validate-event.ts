import type { EventFormData } from "../context/EventsContext";

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }
  // Kategori kontrolünde as Category diyerek tip güvenliğini sağlıyoruz
  if (!data.category || (data.category as string) === "") {
    errors.category = "Bir kategori seçin.";
  }
  if (!data.date || data.date.trim() === "") {
    errors.date = "Tarih boş olamaz.";
  }
  if (!data.time || data.time.trim() === "") {
    errors.time = "Saat boş olamaz.";
  }
  if (!data.location || data.location.trim() === "") {
    errors.location = "Yer boş olamaz.";
  }

  const capacity = Number(data.capacity);
  if (!data.capacity || !Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "1 ile 1000 arası tam sayı olmalı.";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "En az 10 karakter olmalı.";
  }

  return errors;
}