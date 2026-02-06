// # Structured Data Component

// This component injects structured data into the <head>
// person schema / itemPage
export default function JsonLd({ data }: { data: any }) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }