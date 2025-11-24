import { AnimatedTestimonials } from "@/components/ui/testimonial";

export function Animatedreviewsstu() {
  const testimonials = [
    {
      quote:
        "“Transforming beginners into robotics experts with expert guidance and hands-on learning.”",
      name: "Ravichandra",
      designation: "Student at Reva",
      src: "/assets/student_review/1.jpeg",
    },
    {
      quote:
        "“Newrro is an excellent place to learn robotics with a hands-on approach. The trainers are skilled and make learning engaging.”",
      name: "Apoorva",
      designation: "Student at SMVIT",
      src: "/assets/student_review/7.jpeg",
    },
    {
      quote:
        "“Newrro provides exceptional training on ROS, combining practical insights with expert guidance.”",
      name: "Ayush Anand",
      designation: "Student At Nmit",
      src: "/assets/student_review/2.jpeg",
    },
    {
      quote:
        "“The guidance of Newrro tech people was awesome, which changed my perspective on robotics.”",
      name: "Tarun Sridhar",
      designation: "Student At Nmit",
      src: "/assets/student_review/3.jpeg",
    },
    {
      quote:
        "“Newrro's creativity and passion is truly bot-tastic, setting a gold standard in robotic endeavours!”",
      name: "Pooja",
      designation: "Student At JSSATEB",
      src: "/assets/student_review/8.jpeg",
    },
    {
      quote:
        "“Newrow Robotics provided an exceptional hands-on experience, making robotics learning exciting and practical.”",
      name: "Abhishek M",
      designation: "Student At Nmit",
      src: "/assets/student_review/6.jpg",
    },
    {
      quote:
        "“Skilled, collaborative, and inspiring individuals who bring their expertise and passion to innovate and mentor.“",
      name: "Bharath H G",
      designation: "Student at JSSATEB",
      src: "/assets/student_review/4.jpeg",
    },
    {
      quote: "“Amazing teaching, dedicated faculty, exceptional guidance, and inspiring mentorship for growth.“",
      name: "Kishore",
      designation: "Student at Reva",
      src: "/assets/student_review/5.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}