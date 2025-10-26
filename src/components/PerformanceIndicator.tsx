'use client'

import React, { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Zap, Loader, List, TrendingUp } from 'lucide-react'

interface PerformanceIndicatorProps {
  totalProducts: number
  renderedProducts: number
  renderingMode: 'virtual' | 'lazy' | 'pagination'
}

export function PerformanceIndicator({ 
  totalProducts, 
  renderedProducts, 
  renderingMode 
}: PerformanceIndicatorProps) {
  const [performance, setPerformance] = useState({
    memoryUsage: 0,
    renderTime: 0,
    efficiency: 0
  })

  useEffect(() => {
    
    const calculatePerformance = () => {
      const efficiency = Math.round((renderedProducts / totalProducts) * 100)
      const memoryUsage = Math.round((renderedProducts / totalProducts) * 100)
      const renderTime = renderingMode === 'virtual' ? 16 : renderingMode === 'lazy' ? 50 : 200

      setPerformance({
        memoryUsage,
        renderTime,
        efficiency: 100 - efficiency
      })
    }

    calculatePerformance()
  }, [totalProducts, renderedProducts, renderingMode])

  const getModeIcon = () => {
    switch (renderingMode) {
      case 'virtual': return <Zap className="h-4 w-4" />
      case 'lazy': return <Loader className="h-4 w-4" />
      case 'pagination': return <List className="h-4 w-4" />
    }
  }

  const getModeColor = () => {
    switch (renderingMode) {
      case 'virtual': return 'text-green-600'
      case 'lazy': return 'text-blue-600'
      case 'pagination': return 'text-orange-600'
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-sm">
          {getModeIcon()}
          <span>Performance Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Rendering Mode</div>
            <div className={`font-semibold ${getModeColor()}`}>
              {renderingMode.charAt(0).toUpperCase() + renderingMode.slice(1)}
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Rendered Items</div>
            <div className="font-semibold">
              {renderedProducts.toLocaleString()} / {totalProducts.toLocaleString()}
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Memory Efficiency</div>
            <div className="font-semibold text-green-600">
              {performance.efficiency}% saved
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Render Time</div>
            <div className="font-semibold">
              ~{performance.renderTime}ms
            </div>
          </div>
        </div>
        
        {renderingMode === 'virtual' && (
          <div className="mt-3 p-2 bg-green-50 rounded-md">
            <div className="flex items-center space-x-2 text-green-700 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>Virtual scrolling renders only visible items for optimal performance</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

