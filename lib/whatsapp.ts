import { AutoPart } from '@/data/products';

export const STORE_WHATSAPP_NUMBER = '5511999887766'; // Standard store phone number
export const STORE_NAME = 'Paulão Autopeças';
export const STORE_ADDRESS = 'Av. das Nações Unidas, 4500 - São Paulo, SP';

export interface VehicleInfo {
  brand: string;
  model: string;
  year?: number | string;
  engine?: string;
  licensePlate?: string; // Placa do veículo ou Chassi
}

export interface QuoteItem {
  product: AutoPart;
  quantity: number;
}

export interface LeadDetails {
  customerName?: string;
  licensePlate?: string;
  paymentMethod?: string;
  deliveryMethod?: 'retirada' | 'entrega';
  requestPhoto?: boolean;
  customNotes?: string;
}

/**
 * Generates formatted text for WhatsApp Lead preview and direct sending
 */
export function generateSingleProductWhatsAppText(
  product: AutoPart,
  userVehicle?: VehicleInfo | null,
  leadDetails?: LeadDetails
): string {
  let text = `👋 *SOLICITAÇÃO DE ORÇAMENTO DE PEÇA DO ESTOQUE*\n\n`;

  if (leadDetails?.customerName) {
    text += `👤 *Cliente:* ${leadDetails.customerName}\n`;
  }

  text += `⚙️ *Peça:* ${product.name}\n`;
  text += `🏷️ *Código OEM/SKU:* ${product.code}\n`;
  text += `🏭 *Fabricante:* ${product.brand}\n`;
  text += `💲 *Preço de Tabela:* R$ ${product.price.toFixed(2).replace('.', ',')}\n`;
  text += `📍 *Localização no Balcão:* ${product.shelfLocation || 'Estoque Principal'}\n\n`;

  // Vehicle Details
  if (userVehicle && userVehicle.brand) {
    text += `🚗 *DADOS DO VEÍCULO:*\n`;
    text += `• Modelo: ${userVehicle.brand} ${userVehicle.model} ${userVehicle.year ? `(${userVehicle.year})` : ''} ${userVehicle.engine ? `- ${userVehicle.engine}` : ''}\n`;
    if (userVehicle.licensePlate || leadDetails?.licensePlate) {
      text += `• *Placa/Chassi:* ${userVehicle.licensePlate || leadDetails?.licensePlate}\n`;
    }
    text += `\n`;
  } else if (leadDetails?.licensePlate) {
    text += `🚗 *PLACA/CHASSI DO CARRO:* ${leadDetails.licensePlate}\n\n`;
  } else {
    text += `🚗 *Veículo:* Não especificado (Favor conferir compatibilidade)\n\n`;
  }

  // Preferences
  if (leadDetails?.deliveryMethod) {
    text += `📦 *Modalidade:* ${leadDetails.deliveryMethod === 'retirada' ? 'Retirada Imediata no Balcão' : 'Entrega Expressa / Motoboy'}\n`;
  }
  if (leadDetails?.paymentMethod) {
    text += `💳 *Forma de Pagamento:* ${leadDetails.paymentMethod}\n`;
  }
  if (leadDetails?.requestPhoto) {
    text += `📸 *Solicitação:* Desejo receber foto real do item gravado no estoque antes da confirmação.\n`;
  }

  if (leadDetails?.customNotes) {
    text += `📝 *Observação:* ${leadDetails.customNotes}\n`;
  }

  text += `\nConfirma se o item está disponível à pronta entrega com este valor?`;
  return text;
}

export function generateSingleProductWhatsAppLink(
  product: AutoPart,
  userVehicle?: VehicleInfo | null,
  leadDetails?: LeadDetails
): string {
  const text = generateSingleProductWhatsAppText(product, userVehicle, leadDetails);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp formatted text for Cart / Basket Quote
 */
export function generateCartWhatsAppText(
  items: QuoteItem[],
  userVehicle?: VehicleInfo | null,
  leadDetails?: LeadDetails
): string {
  let text = `👋 *SOLICITAÇÃO DE ORÇAMENTO CONSOLIDADO (LISTA DE PEÇAS)*\n\n`;

  if (leadDetails?.customerName) {
    text += `👤 *Cliente:* ${leadDetails.customerName}\n`;
  }

  // Vehicle
  if (userVehicle && userVehicle.brand) {
    text += `🚗 *Veículo:* ${userVehicle.brand} ${userVehicle.model} ${userVehicle.year ? `(${userVehicle.year})` : ''} ${userVehicle.engine ? `- ${userVehicle.engine}` : ''}\n`;
    if (userVehicle.licensePlate || leadDetails?.licensePlate) {
      text += `🔑 *Placa/Chassi:* ${userVehicle.licensePlate || leadDetails?.licensePlate}\n`;
    }
  } else if (leadDetails?.licensePlate) {
    text += `🔑 *Placa/Chassi do Veículo:* ${leadDetails.licensePlate}\n`;
  }

  if (leadDetails?.deliveryMethod) {
    text += `📦 *Modalidade:* ${leadDetails.deliveryMethod === 'retirada' ? 'Retirada no Balcão' : 'Entrega / Motoboy'}\n`;
  }
  if (leadDetails?.paymentMethod) {
    text += `💳 *Pagamento Pretendido:* ${leadDetails.paymentMethod}\n`;
  }

  text += `\n📋 *ITENS SOLICITADOS (${items.length}):*\n`;
  text += `-----------------------------------\n`;

  let totalEstimate = 0;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    totalEstimate += itemTotal;
    text += `${index + 1}. *${item.product.name}*\n`;
    text += `   • Cód OEM: ${item.product.code} | Marca: ${item.product.brand}\n`;
    text += `   • Qtd: ${item.quantity}x R$ ${item.product.price.toFixed(2).replace('.', ',')} = *R$ ${itemTotal.toFixed(2).replace('.', ',')}*\n\n`;
  });

  text += `-----------------------------------\n`;
  text += `💰 *Subtotal de Tabela:* R$ ${totalEstimate.toFixed(2).replace('.', ',')}\n`;

  if (leadDetails?.requestPhoto) {
    text += `📸 *Observação:* Enviar fotos do estoque das peças selecionadas.\n`;
  }

  if (leadDetails?.customNotes) {
    text += `📝 *Notas:* ${leadDetails.customNotes}\n`;
  }

  text += `\nAguardo a confirmação do vendedor com o valor final e disponibilidade de balcão.`;
  return text;
}

export function generateCartWhatsAppLink(
  items: QuoteItem[],
  userVehicle?: VehicleInfo | null,
  leadDetails?: LeadDetails
): string {
  const text = generateCartWhatsAppText(items, userVehicle, leadDetails);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Quick Consultation by License Plate
 */
export function generatePlateConsultationWhatsAppLink(
  licensePlate: string,
  customerName?: string,
  notes?: string
): string {
  let text = `🚗 *CONSULTA RÁPIDA POR PLACA/CHASSI*\n\n`;
  if (customerName) text += `👤 *Nome:* ${customerName}\n`;
  text += `🔑 *Placa ou Chassi:* ${licensePlate.toUpperCase()}\n`;
  if (notes) text += `📝 *Peças Necessárias:* ${notes}\n`;
  text += `\nOlá! Poderiam consultar no sistema de autopeças os códigos e valores das peças para este veículo?`;
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * General Inquiry
 */
export function generateGeneralInquiryWhatsAppLink(customSubject?: string): string {
  const text = customSubject
    ? `Olá! Gostaria de consultar no balcão da *${STORE_NAME}* sobre: ${customSubject}`
    : `Olá! Preciso de ajuda para encontrar peças no estoque do balcão da *${STORE_NAME}*. Podem me atender?`;
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
