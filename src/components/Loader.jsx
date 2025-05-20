import { useNavigation } from "react-router-dom";
import {  AnimatePresence } from "framer-motion";

export default function SlidingLoader() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ x: "-100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-2xl font-bold text-white"
        >
          <motion.img
            src="/images/flying_broom.png"
            alt="Flying Broom"
            className="h-40 w-40"
          />
          <p className="mt-4 text-yellow-400">Sweeping away the curses...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
