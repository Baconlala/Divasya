import { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Radhika Sharma",
    location: "Pune, Maharashtra",
    quote:
      "I've supported temple restoration causes before without ever knowing if the work actually happened. Divasya sent photo updates at every stage — that's rare, and it's why I've kept my monthly donation running.",
  },
  {
    id: "t2",
    name: "Amit Kulkarni",
    location: "Bengaluru, Karnataka",
    quote:
      "The transparency report on the gaushala campaign showed exactly how many cows were fed and treated. That level of detail is what got me to switch from a one-time gift to a monthly one.",
  },
  {
    id: "t3",
    name: "Meera Iyer",
    location: "Chennai, Tamil Nadu",
    quote:
      "Sponsoring a gurukul student's full year felt overwhelming until I saw exactly what the scholarship covers. Now I get a short note from the gurukul every quarter.",
  },
];

export function getAllTestimonials() {
  return testimonials;
}
