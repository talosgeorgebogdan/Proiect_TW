import type { AuditEvent, DeliveryPreview } from './auth-types';

type RuntimeStore = {
  events: AuditEvent[];
  deliveries: DeliveryPreview[];
};

function getRuntimeStore() {
  const globalStore = globalThis as typeof globalThis & {
    __MFA_LAB_RUNTIME__?: RuntimeStore;
  };

  if (!globalStore.__MFA_LAB_RUNTIME__) {
    globalStore.__MFA_LAB_RUNTIME__ = {
      events: [],
      deliveries: [],
    };
  }

  return globalStore.__MFA_LAB_RUNTIME__;
}

export function pushAuditEvent(event: AuditEvent) {
  const store = getRuntimeStore();
  store.events.unshift(event);
  store.events = store.events.slice(0, 40);
}

export function listAuditEventsForUser(userId: string) {
  return getRuntimeStore().events.filter((event) => event.userId === userId).slice(0, 12);
}

export function listAuditEventsForAttempt(attemptId: string) {
  return getRuntimeStore().events.filter((event) => event.attemptId === attemptId).slice(0, 10);
}

export function pushDeliveryPreview(delivery: DeliveryPreview) {
  const store = getRuntimeStore();
  store.deliveries.unshift(delivery);
  store.deliveries = store.deliveries.slice(0, 20);
}

export function listDeliveriesForAttempt(attemptId: string) {
  return getRuntimeStore().deliveries.filter((delivery) => delivery.attemptId === attemptId).slice(0, 4);
}
