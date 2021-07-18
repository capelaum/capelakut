import { Box } from "../Box";

export function TestimonialsBox({ allTestimonials }) {
  return (
    <Box>
      <h2 className="smallTitle">Depoimentos ({allTestimonials.length})</h2>
      <ul className="testimonials-list">
        {allTestimonials
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(testimonial => (
            <li key={testimonial.id}>
              <figure>
                <a
                  href={`https://github.com/${testimonial.username}`}
                  target="_blank"
                  className="username"
                >
                  <img
                    src={`https://github.com/${testimonial.username}.png`}
                    alt={testimonial.username}
                  />
                </a>
              </figure>

              <div className="content">
                <a
                  className="boxLink"
                  href={`https://github.com/${testimonial.username}`}
                  target="_blank"
                >
                  @{testimonial.username}
                </a>
                <p>{testimonial.text}</p>
              </div>
            </li>
          ))}
      </ul>
    </Box>
  );
}
