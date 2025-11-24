import { AnimatedTestimonials } from "@/components/ui/testimonial";

export function Animatedreviewsexp() {
  const testimonials = [
    {
      quote:
        "“An exceptional program that blends hands-on learning with advanced robotics knowledge for students.“",
      name: "Dr.Ramya",
      designation: "Head of the Department , Robotics and Automation , JSSATEB",
      src: "/assets/faculty_review/5.jpeg",
    },
    {
      quote:
        "“The Arjun Robot kits by Newrro enhance hands-on learning,improving student engagement and understanding.“",
      name: "Dr.Bharathi",
      designation: "Head of the Department, Robotics and Artificial Intelligence, Reva University",
      src: "/assets/faculty_review/1.jpeg",
    },
    {
      quote:
        "“An immersive program by NEWRRO that turns curiosity into creativity for young robotics enthusiasts“",
      name: "Dr.Kiran D C",
      designation: "Professor at Vidyashilp University",
      src: "/assets/faculty_review/2.jpeg",
    },
    {
      quote:
        "“Building a robot with cutting-edge technology, where each code adjustment enhances performance and functionality, is truly remarkable.“",
      name: "Dr.Kiran B",
      designation: " Professor at M S Engineering College",
      src: "/assets/faculty_review/3.jpeg",
    },
    {
      quote:
        "“Hands-on robotics training and expert mentorship make this program truly transformative for students.“",
      name: "Dr. G.HEMANTH KUMAR",
      designation: " Professor ",
      src: "/assets/faculty_review/6.jpeg",
    },
    {
      quote:
        "“The robotics training program empowers students to innovate with hands-on, future-focused learning and expert guidance.“",
      name: "Dr.Seema S",
      designation: "Professor at Sir MVIT",
      src: "/assets/faculty_review/4.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}