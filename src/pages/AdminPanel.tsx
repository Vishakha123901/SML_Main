import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash, Plus, X, Pencil } from 'lucide-react';
import { addProduct, getProducts, updateProduct, deleteProduct } from '@/lib/productFirebase';
import { Product, categories as predefinedCategories } from '@/data/products';
import { addBlogPost, getBlogPosts, updateBlogPost, deleteBlogPost } from '@/lib/blogFirebase';
import { BlogPost } from '@/data/blog';
import { loadGapiInsideDOM } from 'gapi-script'; // Corrected import for gapi-script
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MediaGalleryCMS from '@/components/admin/MediaGalleryCMS';

declare global {
  interface Window {
    gapi: any;
  }
}

const AdminPanel = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border p-6 flex flex-col">
        <h2 className="font-heading font-bold text-2xl mb-6 text-foreground">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/blogs">Blogs</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/products">Products</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/analytics">Analytics</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/media-gallery">Media Gallery</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <Button onClick={logout} className="w-full btn-primary mt-6">
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

// Media Gallery Admin Component
export const MediaGalleryAdmin = () => {
  return <MediaGalleryCMS />;
};

// Blog Admin Component
export const BlogsAdmin = () => {
  const initialBlogFormData: Omit<BlogPost, 'id' | 'publishDate'> = {
    title: '',
    category: 'Uncategorized', // Added category with default
    mainImage: '',
    shortDescription: '',
    author: '',
    sections: [],
  };

  const blogCategories = [
    "Uncategorized",
    "Nutrition",
    "Protein",
    "Digestive Health",
    "White Label Insights",
    "Case Study" // New category added
  ];
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogFormData, setBlogFormData] = useState<Omit<BlogPost, 'id' | 'publishDate'>>(initialBlogFormData);
  const [editingBlogPostId, setEditingBlogPostId] = useState<string | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [blogError, setBlogError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingBlogs(true);
    setBlogError(null);
    const unsubscribe = getBlogPosts(
      (fetchedPosts) => {
        setBlogPosts(fetchedPosts);
        setLoadingBlogs(false);
      },
      (errorMessage) => {
        setBlogError(errorMessage);
        setLoadingBlogs(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlogFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (index: number, field: 'type' | 'content', value: string) => {
    const newSections = [...blogFormData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setBlogFormData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const addSection = () => {
    setBlogFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { type: 'paragraph', content: '' }],
    }));
  };

  const removeSection = (index: number) => {
    const newSections = blogFormData.sections.filter((_, i) => i !== index);
    setBlogFormData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const resetBlogForm = () => {
    setBlogFormData(initialBlogFormData);
    setEditingBlogPostId(null);
    setBlogError(null);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogError(null);
    try {
      if (editingBlogPostId) {
        await updateBlogPost(editingBlogPostId, blogFormData);
      } else {
        await addBlogPost(blogFormData);
      }
      resetBlogForm();
    } catch (err: any) {
      setBlogError(`Failed to ${editingBlogPostId ? 'update' : 'add'} blog post: ${err.message || 'Unknown error'}`);
      console.error(err);
    }
  };

  const handleEditBlogPost = (post: BlogPost) => {
    // Omit 'id' and 'publishDate' from the post when setting form data
    const { id, publishDate, ...rest } = post;
    setBlogFormData({ ...rest, sections: rest.sections || [] }); // Ensure sections is an array and include category
    setEditingBlogPostId(id);
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      await deleteBlogPost(id);
    } catch (err: any) {
      setBlogError(`Failed to delete blog post: ${err.message || 'Unknown error'}`);
      console.error(err);
    }
  };

  if (loadingBlogs) {
    return <p>Loading blog posts...</p>;
  }

  if (blogError) {
    return <p className="text-destructive">Error: {blogError}</p>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingBlogPostId ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
          <CardDescription>Use the form below to {editingBlogPostId ? 'edit' : 'add a new'} blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="blog-title">Title</Label>
              <Input id="blog-title" name="title" value={blogFormData.title} onChange={handleBlogChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-author">Author</Label>
              <Input id="blog-author" name="author" value={blogFormData.author} onChange={handleBlogChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-category">Category</Label>
              <select
                id="blog-category"
                name="category"
                value={blogFormData.category}
                onChange={handleBlogChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {blogCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-2 col-span-full">
              <Label htmlFor="blog-mainImage">Main Image URL</Label>
              <Input id="blog-mainImage" name="mainImage" value={blogFormData.mainImage} onChange={handleBlogChange} required />
            </div>
            <div className="grid gap-2 col-span-full">
              <Label htmlFor="blog-shortDescription">Short Description</Label>
              <Textarea id="blog-shortDescription" name="shortDescription" value={blogFormData.shortDescription} onChange={handleBlogChange} rows={3} required />
            </div>

            {/* Blog Sections */}
            <div className="grid gap-2 col-span-full">
              <Label>Content Sections</Label>
              {blogFormData.sections.map((section, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 mb-4 p-3 border rounded-md">
                  <select
                    value={section.type}
                    onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/4"
                  >
                    <option value="heading">Heading</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="points">Points (one per line)</option>
                    <option value="image">Image URL</option>
                    <option value="video">YouTube Video URL</option>
                  </select>
                  {
                    section.type === 'paragraph' || section.type === 'points' ? (
                      <Textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        placeholder={section.type === 'paragraph' ? 'Enter paragraph content' : 'Enter points (one per line)'}
                        className="flex-1"
                        rows={section.type === 'points' ? 5 : 3}
                      />
                    ) : (
                      <Input
                        type="text"
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        placeholder={section.type === 'heading' ? 'Enter heading text' : `Enter ${section.type} URL`}
                        className="flex-1"
                      />
                    )
                  }
                  <Button type="button" variant="outline" size="icon" onClick={() => removeSection(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" /> Add Content Section
              </Button>
            </div>

            <div className="col-span-full flex gap-2">
              <Button type="submit" className="btn-primary flex-1">
                {editingBlogPostId ? 'Update Blog Post' : 'Add Blog Post'}
              </Button>
              <Button type="button" variant="outline" onClick={resetBlogForm} className="flex-1 hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white text-black group">
                <span className="group-hover:text-white">Clear Form</span>
              </Button>
            </div>
            {blogError && <p className="text-destructive col-span-full text-center">{blogError}</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Blog Posts</CardTitle>
          <CardDescription>Manage your existing blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {blogPosts.length === 0 ? (
            <p>No blog posts found. Add a new blog post using the form above.</p>
          ) : (
            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b border-border py-2 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={post.mainImage} alt={post.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold text-foreground">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">by {post.author} on {post.publishDate}</p>
                      <p className="text-xs text-muted-foreground">Category: {post.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditBlogPost(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteBlogPost(post.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Product Admin Component (existing, unchanged)
export const ProductsAdmin = () => {
  const initialFormData: Omit<Product, 'id'> = {
    name: '',
    category: predefinedCategories[1] || '', // Default to first category after "All"
    image: '',
    badges: [],
    highlights: [],
    marketplaceLinks: [],
    socialLinks: {
      flipkart: '',
      amazon: '',
      insta: '',
      blinkit: '',
    },
    description: '',
    directions: '',
    storage: '',
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialFormData);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = getProducts(
      (fetchedProducts) => {
        setProducts(fetchedProducts);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
    return () => {
      // This cleanup function will be called when the component unmounts
      // or before the effect runs again.
      unsubscribe();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name: keyof Omit<Product, 'id'>, index: number, value: string) => {
    const currentArray = formData[name] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [name]: newArray,
    }));
  };

  const addArrayItem = (name: keyof Omit<Product, 'id'>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] as string[]), ''],
    }));
  };

  const removeArrayItem = (name: keyof Omit<Product, 'id'>, index: number) => {
    const currentArray = formData[name] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [name]: newArray,
    }));
  };

  const handleMarketplaceLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...formData.marketplaceLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      marketplaceLinks: newLinks,
    }));
  };

  const addMarketplaceLink = () => {
    setFormData((prev) => ({
      ...prev,
      marketplaceLinks: [...prev.marketplaceLinks, { label: '', url: '' }],
    }));
  };

  const removeMarketplaceLink = (index: number) => {
    const newLinks = formData.marketplaceLinks.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      marketplaceLinks: newLinks,
    }));
  };

  const handleSocialLinkChange = (platform: keyof (typeof initialFormData)['socialLinks'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProductId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingProductId) {
        await updateProduct(editingProductId, formData);
      } else {
        await addProduct(formData);
      }
      resetForm();
    } catch (err) {
      setError(`Failed to ${editingProductId ? 'update' : 'add'} product.`);
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingProductId(product.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      setError('Failed to delete product.');
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-destructive">Error: {error}</p>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingProductId ? 'Edit Product' : 'Add New Product'}</CardTitle>
          <CardDescription>Use the form below to {editingProductId ? 'edit' : 'add a new'} product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {predefinedCategories.filter(cat => cat !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 col-span-full">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
            </div>
            <div className="grid gap-2 col-span-full">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows={3} />
            </div>
            <div className="grid gap-2 col-span-full">
              <Label htmlFor="directions">Directions</Label>
              <Textarea id="directions" name="directions" value={formData.directions || ''} onChange={handleChange} rows={3} />
            </div>
            <div className="grid gap-2 col-span-full">
              <Label htmlFor="storage">Storage</Label>
              <Textarea id="storage" name="storage" value={formData.storage || ''} onChange={handleChange} rows={3} />
            </div>

            {/* Badges */}
            <div className="grid gap-2 col-span-full">
              <Label>Badges</Label>
              {formData.badges.map((badge, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={badge}
                    onChange={(e) => handleArrayChange('badges', index, e.target.value)}
                    placeholder="e.g., Iron Rich"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('badges', index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem('badges')}>
                <Plus className="h-4 w-4 mr-2" /> Add Badge
              </Button>
            </div>

            {/* Highlights */}
            <div className="grid gap-2 col-span-full">
              <Label>Highlights</Label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    placeholder="e.g., Rich in natural iron and calcium"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('highlights', index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem('highlights')}>
                <Plus className="h-4 w-4 mr-2" /> Add Highlight
              </Button>
            </div>

            {/* Marketplace Links */}
            <div className="grid gap-2 col-span-full">
              <Label>Marketplace Links</Label>
              {formData.marketplaceLinks.map((link, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Input
                    value={link.label}
                    onChange={(e) => handleMarketplaceLinkChange(index, 'label', e.target.value)}
                    placeholder="Label (e.g., Buy on Flipkart)"
                    className="flex-1"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => handleMarketplaceLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeMarketplaceLink(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addMarketplaceLink}>
                <Plus className="h-4 w-4 mr-2" /> Add Marketplace Link
              </Button>
            </div>

            {/* Social Links */}
            <div className="grid gap-2 col-span-full">
              <Label>Social Links</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="social-flipkart">Flipkart URL</Label>
                  <Input
                    id="social-flipkart"
                    value={formData.socialLinks?.flipkart || ''}
                    onChange={(e) => handleSocialLinkChange('flipkart', e.target.value)}
                    placeholder="Flipkart social link"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-amazon">Amazon URL</Label>
                  <Input
                    id="social-amazon"
                    value={formData.socialLinks?.amazon || ''}
                    onChange={(e) => handleSocialLinkChange('amazon', e.target.value)}
                    placeholder="Amazon social link"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-insta">Instagram URL</Label>
                  <Input
                    id="social-insta"
                    value={formData.socialLinks?.insta || ''}
                    onChange={(e) => handleSocialLinkChange('insta', e.target.value)}
                    placeholder="Instagram social link"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-blinkit">Blinkit URL</Label>
                  <Input
                    id="social-blinkit"
                    value={formData.socialLinks?.blinkit || ''}
                    onChange={(e) => handleSocialLinkChange('blinkit', e.target.value)}
                    placeholder="Blinkit social link"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full flex gap-2">
              <Button type="submit" className="btn-primary flex-1">
                {editingProductId ? 'Update Product' : 'Add Product'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                Clear Form
              </Button>
            </div>
            {error && <p className="text-destructive col-span-full text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <CardDescription>Manage your existing product listings.</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p>No products found. Add a new product using the form above.</p>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b border-border py-2 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface AnalyticsData {
  date: string;
  screenPageViews: number;
}

// Google Analytics 4 Data API Integration
export const AnalyticsAdmin = () => {
  // Constants for Google API client and Analytics Data API
  const CLIENT_ID = '78565279703-dh58j90o2cev3bkiim2jj5fr2ap6bdsf.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/analytics.readonly';
  const GA4_PROPERTY_ID = '508276382'; // Your GA4 Property ID (not Measurement ID)

  // State variables for authentication and analytics data
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [gapiReady, setGapiReady] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  // Load the Google API client library
  useEffect(() => {
    loadGapiInsideDOM()
      .then(() => {
        if (!window.gapi) {
          console.error('window.gapi is not available after loading gapi script.');
          setAnalyticsError('Failed to load Google API script (gapi object missing). Please refresh.');
          return;
        }
        console.log('gapi script loaded. Now loading client:auth2 libraries.');

        window.gapi.load('client:auth2', async () => {
          try {
            await window.gapi.client.init({
              clientId: CLIENT_ID,
              scope: SCOPES,
              discoveryDocs: ['https://analyticsdata.googleapis.com/$discovery/rest?version=v1'],
            });

            if (!window.gapi.auth2) {
              console.warn('gapi.auth2 is not present after client.init. Attempting auth2.init');
              try {
                await window.gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES });
              } catch (e) {
                console.error('gapi.auth2.init failed:', e);
              }
            }

            const authInstance = window.gapi.auth2 && window.gapi.auth2.getAuthInstance ? window.gapi.auth2.getAuthInstance() : null;
            if (authInstance && authInstance.isSignedIn) {
              authInstance.isSignedIn.listen(updateSignInStatus);
              updateSignInStatus(authInstance.isSignedIn.get());
            } else {
              console.warn('Auth instance not available. User sign-in may not work until it initializes.');
            }

            setGapiReady(true);
          } catch (error) {
            console.error('Error initializing gapi client:', error);
            setAnalyticsError('Failed to initialize Google API client. Check console for details.');
          }
        });
      })
      .catch((error: any) => {
        console.error('Error loading gapi script:', error);
        setAnalyticsError('Failed to load Google API script. Check console for details.');
      });
  }, []);

  // Update React state when the sign-in status changes.
  const updateSignInStatus = (isUserSignedIn: boolean) => {
    setIsSignedIn(isUserSignedIn);
    if (isUserSignedIn) {
      fetchAnalyticsData();
    } else {
      setAnalyticsData([]);
    }
  };

  // Sign in the user upon button click.
  const handleSignIn = () => {
    const authInstance = window.gapi?.auth2?.getAuthInstance?.();
    if (authInstance) {
      authInstance.signIn();
    } else {
      setAnalyticsError('Auth is not initialized yet. Please wait a moment and try again.');
    }
  };

  // Sign out the user upon button click.
  const handleSignOut = () => {
    const authInstance = window.gapi?.auth2?.getAuthInstance?.();
    if (authInstance) {
      authInstance.signOut();
    } else {
      setAnalyticsError('Auth is not initialized yet.');
    }
  };

  // Fetch analytics data from Google Analytics Data API
  const fetchAnalyticsData = async () => {
    if (!window.gapi.client || !window.gapi.client.analyticsdata) {
      console.error('Google Analytics Data API not loaded.');
      setAnalyticsError('Google API client not fully loaded. Please refresh.');
      return;
    }

    setLoadingAnalytics(true);
    setAnalyticsError(null);

    // Calculate date range for the last 7 days
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const response = await window.gapi.client.analyticsdata.properties.runReport({
        property: `properties/${GA4_PROPERTY_ID}`,
        requestBody: {
          dimensions: [{ name: 'date' }],
          metrics: [{ name: 'screenPageViews' }],
          dateRanges: [{ startDate: startDate, endDate: endDate }],
        },
      });

      const rows = response.result.rows;
      if (rows && rows.length > 0) {
        const formattedData: AnalyticsData[] = rows.map((row: any) => ({
          date: row.dimensionValues[0].value,
          screenPageViews: parseInt(row.metricValues[0].value, 10),
        }));
        setAnalyticsData(formattedData);
      } else {
        setAnalyticsData([]);
        setAnalyticsError('No analytics data available for the last 7 days.');
      }
    } catch (err: any) {
      console.error('Error fetching analytics data:', err);
      setAnalyticsError(`Failed to fetch analytics data: ${err.message || 'Check console for details.'}`);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Render the Analytics Admin panel
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Google Analytics Integration</CardTitle>
        <CardDescription>View your website analytics directly within the admin panel.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
        {!gapiReady ? (
          <p>Loading Google API client...</p>
        ) : !isSignedIn ? (
          <div className="text-center space-y-4">
            <p>Please sign in to view analytics data.</p>
            <Button onClick={handleSignIn} className="btn-primary">
              Sign In with Google
            </Button>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center space-y-4">
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold">Page Views (Last 7 Days)</h3>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
            {loadingAnalytics ? (
              <p>Loading analytics data...</p>
            ) : analyticsError ? (
              <p className="text-destructive">Error: {analyticsError}</p>
            ) : analyticsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="screenPageViews" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No page view data available for the last 7 days.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
