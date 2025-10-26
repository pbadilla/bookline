'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Product } from '@/types'
import { getProducts } from '@/services/productService'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import { Plus, Edit, Trash2, ArrowLeft, Home } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const AdminPageContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  })

  // Fetch products from service
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts()
      setProducts(data)
    }
    fetchData()
  }, [])

  const handleAddProduct = () => {
    setIsAddingProduct(true)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', category: '', stock: '' })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsAddingProduct(false)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString()
    })
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const handleSaveProduct = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill in all fields')
      return
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    }

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updatedAt: new Date() }
          : p
      ))
      setEditingProduct(null)
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
        image: '/images/default-book.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setProducts([...products, newProduct])
      setIsAddingProduct(false)
    }

    setFormData({ name: '', description: '', price: '', category: '', stock: '' })
  }

  const handleCancel = () => {
    setIsAddingProduct(false)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', category: '', stock: '' })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Store</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" /> Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm font-medium text-muted-foreground">
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle>Total Products</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{products.length}</div></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">0</div></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">$0.00</div></CardContent>
          </Card>
        </div>

        {/* Product Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Products</h2>
          <Button onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add / Edit Modal */}
        {(isAddingProduct || editingProduct) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['name', 'description', 'price', 'category', 'stock'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <Input
                      placeholder={field}
                      type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                      step={field === 'price' ? 0.01 : undefined}
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                    />
                  </div>
                ))}

                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={handleSaveProduct}>
                    {editingProduct ? 'Update' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleCancel}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

const AdminPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminPageContent />
    </ProtectedRoute>
  )
}

export default AdminPage
