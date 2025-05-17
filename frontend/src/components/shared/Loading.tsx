import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-neutral-900">
      <div className="flex space-x-2 rtl:space-x-reverse">
        <motion.div
          className="w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500"
          animate={{
            y: ["0%", "-100%", "0%"]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500"
          animate={{
            y: ["0%", "-100%", "0%"]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500"
          animate={{
            y: ["0%", "-100%", "0%"]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
        />
      </div>
    </div>
  );
};

export default Loading;