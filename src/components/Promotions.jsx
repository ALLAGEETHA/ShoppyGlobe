const promotions = [
  {
    id: 1,
    title: 'Festive Combo',
    description: 'Buy 2 cosmetics items and get 25% off on skincare kits.',
    tag: 'Limited Time'
  },
  {
    id: 2,
    title: 'Furniture Flash Sale',
    description: 'Modern sofa sets starting at ₹18,999 with free delivery.',
    tag: 'Hot Deal'
  },
  {
    id: 3,
    title: 'Fresh Veggies Pack',
    description: 'Weekly subscription boxes with organic vegetables.',
    tag: 'New'
  }
];

function Promotions() {
  return (
    <section className="promotions">
      {promotions.map((promo) => (
        <article key={promo.id} className="promo-card">
          <div className="promo-tag">{promo.tag}</div>
          <h3>{promo.title}</h3>
          <p>{promo.description}</p>
          <button className="btn small">Shop Now</button>
        </article>
      ))}
    </section>
  );
}

export default Promotions;

