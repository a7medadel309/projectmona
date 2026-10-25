"use client"
import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { allPerfumes } from '@/data/perfumes'

export interface InventoryItem {
  id: number
  brand: string
  title: string
  body: string
  accords?: string
  price: number
  volume: string
  status: 'In Stock' | 'Low Reserve' | 'Out of Stock'
  isArchived: boolean
  topNotes?: string
  heartNotes?: string
  baseNotes?: string
}

interface InventoryContextType {
  inventory: InventoryItem[]
  activeInventory: InventoryItem[]
  archivedInventory: InventoryItem[]
  addEdition: (item: Omit<InventoryItem, 'id' | 'isArchived'>) => void
  archiveEdition: (id: number) => void
  restoreEdition: (id: number) => void
  deletePermanently: (id: number) => void
  updatePrice: (id: number, newPrice: number) => void
  toggleStatus: (id: number) => void
}

// السطر المفقود الذي كان يسبب الخطأ
const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

// تحويل عطور الكتالوج الأساسية
const defaultCatalogue: InventoryItem[] = allPerfumes.map((p) => ({
  id: p.id,
  brand: p.brand || "Sukoon Private",
  title: p.title,
  body: p.body,
  accords: p.heartNotes || p.body,
  price: p.price,
  volume: p.volume,
  status: 'In Stock',
  isArchived: false,
  topNotes: p.topNotes,
  heartNotes: p.heartNotes,
  baseNotes: p.baseNotes,
}))

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (typeof window === 'undefined') return defaultCatalogue
    try {
      const saved = localStorage.getItem('sukoon_inventory')
      if (saved) {
        const parsed: InventoryItem[] = JSON.parse(saved)
        const customItems = parsed.filter(item => !defaultCatalogue.some(d => d.id === item.id))
        const merged = [...defaultCatalogue, ...customItems]
        return merged.map(item => {
          const matched = parsed.find(p => p.id === item.id)
          return matched ? { ...item, ...matched } : item
        })
      }
      return defaultCatalogue
    } catch {
      return defaultCatalogue
    }
  })

  const saveToStorage = (updated: InventoryItem[]) => {
    setInventory(updated)
    try {
      localStorage.setItem('sukoon_inventory', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const addEdition = (item: Omit<InventoryItem, 'id' | 'isArchived'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now(),
      isArchived: false,
    }
    const updated = [newItem, ...inventory]
    saveToStorage(updated)
    toast.success(`"${item.title}" added to Atelier Catalogue & Collection`)
  }

  const archiveEdition = (id: number) => {
    const target = inventory.find(i => i.id === id)
    const updated = inventory.map(item =>
      item.id === id ? { ...item, isArchived: true } : item
    )
    saveToStorage(updated)
    toast.info(`"${target?.title}" moved to Fragrance Archive`)
  }

  const restoreEdition = (id: number) => {
    const target = inventory.find(i => i.id === id)
    const updated = inventory.map(item =>
      item.id === id ? { ...item, isArchived: false } : item
    )
    saveToStorage(updated)
    toast.success(`"${target?.title}" restored to Active Catalogue`)
  }

  const deletePermanently = (id: number) => {
    const target = inventory.find(i => i.id === id)
    const updated = inventory.filter(item => item.id !== id)
    saveToStorage(updated)
    toast.error(`"${target?.title}" permanently deleted`)
  }

  const updatePrice = (id: number, newPrice: number) => {
    const updated = inventory.map(item =>
      item.id === id ? { ...item, price: newPrice } : item
    )
    saveToStorage(updated)
    toast.success(`Price updated to ${newPrice.toLocaleString()} EGP`)
  }

  const toggleStatus = (id: number) => {
    const updated = inventory.map(item => {
      if (item.id === id) {
        const nextStatus: InventoryItem['status'] =
          item.status === 'In Stock'
            ? 'Low Reserve'
            : item.status === 'Low Reserve'
            ? 'Out of Stock'
            : 'In Stock'
        return { ...item, status: nextStatus }
      }
      return item
    })
    saveToStorage(updated)
    toast.info('Stock status updated')
  }

  const activeInventory = inventory.filter(i => !i.isArchived)
  const archivedInventory = inventory.filter(i => i.isArchived)

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        activeInventory,
        archivedInventory,
        addEdition,
        archiveEdition,
        restoreEdition,
        deletePermanently,
        updatePrice,
        toggleStatus,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (!context) throw new Error('useInventory must be used within InventoryProvider')
  return context
}