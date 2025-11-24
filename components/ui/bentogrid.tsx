import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[auto] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  imageSrc,
  imageAlt,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-[#4A3EBD] dark:shadow-none p-4 dark:bg-#feffff dark:border-white/[0.2] bg-white border border-[#4A3EBD] justify-between flex flex-col space-y-2",
        className
      )}
    >
      {header}

      {/* Adjust image dynamically */}
    
      {imageSrc && (
        <div className="relative w-full h-auto rounded-lg overflow-hidden mb-4">
          <Image
            src={imageSrc}
            alt={imageAlt || "Specification image"}
            width={300} // Set dynamic width
            height={200} // Adjust this dynamically or make it responsive
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

     
        <div className="mb-4 text-[#df5bd3] group-hover:text-[#7e5bf6] transition-colors duration-300">
           {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
    </motion.div>
  );
};
