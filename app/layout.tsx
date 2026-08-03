import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Paulão Autopeças - Autopeças e Orçamentos no WhatsApp',
  description: 'Distribuidora de peças automotivas com estoque físico garantido e orçamentos via WhatsApp.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var currentFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    get: function() { return currentFetch; },
                    set: function(fn) { currentFetch = fn; },
                    configurable: true,
                    enumerable: true
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

