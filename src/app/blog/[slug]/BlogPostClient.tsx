"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface BlogPostClientProps {
  post: BlogPost;
  jsonLd: any;
}

export default function BlogPostClient({ post, jsonLd }: BlogPostClientProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <motion.header 
          className="relative h-96 bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative z-10 h-full flex items-end">
            <motion.div 
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="flex items-center text-white/80 text-sm mb-4"
                variants={fadeInUp}
              >
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span className="mx-2">•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="mx-2">•</span>
                <span>{post.readTime} min read</span>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                variants={fadeInUp}
              >
                {post.title}
              </motion.h1>
              <motion.div 
                className="flex items-center"
                variants={fadeInUp}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  <p className="text-white/80 text-sm">{post.author.role}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.article 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:my-2
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-a:text-primary-600 dark:prose-a:text-primary-400
              prose-a:no-underline hover:prose-a:underline
              prose-a:font-medium prose-a:transition-colors
              prose-code:text-primary-700 dark:prose-code:text-primary-300
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500
              prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800
              prose-blockquote:py-4 prose-blockquote:px-6
              prose-blockquote:my-8 prose-blockquote:italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full
                    hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Share buttons */}
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  name: 'Twitter',
                  url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://rrequipment.com/blog/${post.slug}`)}`,
                  color: 'hover:text-blue-400'
                },
                {
                  name: 'LinkedIn',
                  url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rrequipment.com/blog/${post.slug}`)}`,
                  color: 'hover:text-blue-600'
                },
                {
                  name: 'Facebook',
                  url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rrequipment.com/blog/${post.slug}`)}`,
                  color: 'hover:text-blue-700'
                }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 dark:text-gray-400 ${social.color} transition-colors font-medium`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </>
  );
} 