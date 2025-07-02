"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, generateSlug, calculateReadTime } from '@/lib/blog';

interface BlogFormProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export default function BlogFormClient({ post, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    publishedAt: new Date().toISOString().slice(0, 16), // For datetime-local input
    readTime: 1,
    tags: [],
    author: {
      name: 'Admin User',
      avatar: '/images/authors/admin.jpg',
      role: 'Administrator',
    },
  });

  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [contentMode, setContentMode] = useState<'editor' | 'upload'>('editor');

  useEffect(() => {
    if (post && isEditing) {
      setFormData({
        ...post,
        publishedAt: new Date(post.publishedAt).toISOString().slice(0, 16),
      });
      setTagsInput(post.tags.join(', '));
      setContentMode('editor');
    }
  }, [post, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }

    // Auto-calculate read time from content
    if (name === 'content') {
      setFormData(prev => ({
        ...prev,
        readTime: calculateReadTime(value)
      }));
    }
  };

  const handleAuthorChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      author: {
        ...prev.author!,
        [field]: value
      }
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    
    // Convert comma-separated string to array
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/html' && !file.name.endsWith('.html')) {
      alert('Please select an HTML file');
      return;
    }

    setHtmlFile(file);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        content,
        readTime: calculateReadTime(content)
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.tags?.length) {
        throw new Error('Please add at least one tag');
      }

      const blogPost: BlogPost = {
        slug: formData.slug!,
        title: formData.title!,
        excerpt: formData.excerpt!,
        content: formData.content!,
        featuredImage: formData.featuredImage || '/images/blog/default.jpg',
        publishedAt: new Date(formData.publishedAt!).toISOString(),
        readTime: formData.readTime!,
        tags: formData.tags!,
        author: formData.author!,
      };

      const url = isEditing ? `/api/blog/${post?.slug}` : '/api/blog';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(blogPost),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update your blog post content and settings' : 'Create a new blog post by uploading HTML or using the editor'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
              </div>

              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  placeholder="/images/blog/my-post.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date *
                </label>
                <input
                  type="datetime-local"
                  id="publishedAt"
                  name="publishedAt"
                  required
                  value={formData.publishedAt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  id="readTime"
                  name="readTime"
                  min="1"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated from content</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the blog post..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags *
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tagsInput}
                  onChange={handleTagsChange}
                  placeholder="Equipment, Maintenance, Construction (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Author Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  id="authorName"
                  required
                  value={formData.author?.name || ''}
                  onChange={(e) => handleAuthorChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="authorRole" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Role *
                </label>
                <input
                  type="text"
                  id="authorRole"
                  required
                  value={formData.author?.role || ''}
                  onChange={(e) => handleAuthorChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="authorAvatar" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Avatar URL
                </label>
                <input
                  type="url"
                  id="authorAvatar"
                  value={formData.author?.avatar || ''}
                  onChange={(e) => handleAuthorChange('avatar', e.target.value)}
                  placeholder="/images/authors/author-name.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
            
            {/* Content Mode Selector */}
            <div className="mb-6">
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setContentMode('editor')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                    contentMode === 'editor'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  HTML Editor
                </button>
                <button
                  type="button"
                  onClick={() => setContentMode('upload')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                    contentMode === 'upload'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Upload HTML File
                </button>
              </div>
            </div>

            {contentMode === 'upload' ? (
              <div>
                <label htmlFor="htmlFile" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload HTML File *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="htmlFile"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload an HTML file</span>
                        <input
                          id="htmlFile"
                          name="htmlFile"
                          type="file"
                          accept=".html,text/html"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">HTML files only</p>
                    {htmlFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {htmlFile.name} uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={20}
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="<p>Your blog post content in HTML...</p>"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your blog post content in HTML format. Read time will be automatically calculated.
                </p>
              </div>
            )}

            {formData.content && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Content Preview</h3>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 max-h-60 overflow-y-auto">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 