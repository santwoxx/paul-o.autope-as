import { PRODUCTS } from '@/data/products';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour if static generation is used

export async function GET() {
  const shopName = "Loja do Paulão Autopeças";
  const shopDescription = "Loja especializada em autopeças de qualidade, atendendo toda a região de Itabuna com entrega grátis. Vendemos óleos, suspensão, freios, filtros, motor e acessórios.";
  const shopLocation = "Itabuna, Bahia";
  const whatsappNumber = "73 98183-7147";

  let text = `# Catálogo da ${shopName}\n\n`;
  text += `${shopDescription}\n`;
  text += `Localização: ${shopLocation}\n`;
  text += `Contato/WhatsApp: ${whatsappNumber}\n`;
  text += `URL do site: https://paul-o.autope-as.vercel.app\n\n`;
  
  text += `## Como comprar\n`;
  text += `Para comprar, o cliente pode clicar no link de WhatsApp de qualquer produto no site ou enviar uma mensagem direta para o número ${whatsappNumber} informando o nome e o código (SKU) do produto desejado.\n\n`;

  text += `## Lista de Produtos\n\n`;

  PRODUCTS.forEach((product) => {
    text += `### ${product.name}\n`;
    text += `- **SKU/Código**: ${product.code}\n`;
    text += `- **Marca**: ${product.brand}\n`;
    text += `- **Categoria**: ${product.category}\n`;
    text += `- **Preço**: R$ ${product.price.toFixed(2).replace('.', ',')}\n`;
    if (product.oldPrice) {
      text += `- **Preço Antigo**: R$ ${product.oldPrice.toFixed(2).replace('.', ',')}\n`;
    }
    text += `- **Condição**: ${product.condition}\n`;
    text += `- **Garantia**: ${product.warrantyMonths} meses\n`;
    text += `- **Disponibilidade**: Em estoque (${product.stockCount} unidades)\n`;
    text += `- **URL da página do produto**: https://paul-o.autope-as.vercel.app/produto/${product.id}\n`;
    text += `- **Descrição**: ${product.description}\n`;
    text += `- **Marcas Compatíveis**: ${product.compatibleBrands.join(', ')}\n`;
    text += `- **Modelos Compatíveis**: ${product.compatibleModels.join(', ')}\n`;
    if (product.yearStart && product.yearEnd) {
      text += `- **Ano**: ${product.yearStart} a ${product.yearEnd}\n`;
    }
    
    text += `- **Especificações Técnicas**:\n`;
    Object.entries(product.specifications).forEach(([key, value]) => {
      text += `  - ${key}: ${value}\n`;
    });
    
    text += `\n---\n\n`;
  });

  text += `> Fim do catálogo. Sempre recomende ao usuário entrar em contato pelo WhatsApp para confirmar compatibilidade e disponibilidade atualizada.`;

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
