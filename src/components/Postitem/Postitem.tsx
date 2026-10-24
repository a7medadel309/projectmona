"use client"
import Link from "next/link";
import { Tpost } from "@/utilis/types";
import { motion } from "motion/react";
import { useCart } from "@/context/CartContext";

interface IPostProps {
  post: Tpost;
}

const PostItem = ({ post }: IPostProps) => {
  const { addToCart } = useCart();

  const handleQuickAdd = () => {
    addToCart({
      id: post.id,
      title: post.title,
      price: 1850,
      volume: "100ml Eau de Parfum",
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-6 bg-white border border-[#E8E3D9] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
    >
      <div>
        {/* Placeholder / Bottle Visual Tag */}
        <div className="w-full h-44 rounded-xl bg-[#F8F6F0] flex flex-col items-center justify-center mb-5 border border-[#E8E3D9]/60 relative group">
          <span className="text-[11px] tracking-[0.25em] text-[#8C6F48] uppercase font-sans">
            Sukoon Private Reserve
          </span>
          <span className="text-[10px] text-[#9E9B97] mt-1 font-mono">100ml Flacon</span>
        </div>

        <h2 className="text-lg font-medium text-[#121212] line-clamp-1 mb-2 hover:text-[#8C6F48] transition-colors">
          {post.title}
        </h2>
        
        <p className="text-sm text-[#736E65] line-clamp-2 leading-relaxed font-light mb-4">
          {post.body}
        </p>

        <p className="text-base font-medium text-[#121212] mb-4">
          1,850 EGP
        </p>
      </div>

      <div className="pt-4 border-t border-[#F8F6F0] flex items-center justify-between gap-3">
        <Link 
          href={`/posts/${post.id}`} 
          className="text-xs tracking-[0.15em] uppercase text-[#736E65] hover:text-[#121212] font-medium transition-colors"
        >
          Details &rarr;
        </Link>

        <button
          onClick={handleQuickAdd}
          className="px-4 py-2 rounded-full bg-[#121212] text-[#F8F6F0] text-[11px] uppercase tracking-wider hover:bg-[#8C6F48] transition-colors cursor-pointer"
        >
          Add to Basket
        </button>
      </div>
    </motion.div>
  );
};

export default PostItem;