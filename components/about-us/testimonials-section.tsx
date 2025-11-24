"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    { quote: "Newrro's ARJUNA kit gave our students real-world ROS experience—unmatched by any other program.", author: "Prof. A. Kumar, BMSCE" },
    { quote: "Our lab setup was turnkey, on-time, and perfectly tailored to our curriculum.", author: "Dr. S. Rao, Reva University" },
];

export function TestimonialsSection() {
    return (
        <section className="bg-background py-20 text-foreground md:py-32">
            <div className="container mx-auto px-4">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-bold md:text-6xl">What Our Partners Say</h2>
                </motion.div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="rounded-xl border bg-card p-8 shadow-lg"
                        >
                            <Quote className="mb-4 h-10 w-10 text-primary" />
                            <p className="mb-6 text-xl italic text-muted-foreground">{testimonial.quote}</p>
                            <p className="text-right font-semibold text-foreground">- {testimonial.author}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}