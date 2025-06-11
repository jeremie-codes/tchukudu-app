import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Order {
  id: string;
  clientName?: string;
  transporterName?: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'cancelled';
  pickup: string;
  destination: string;
  price: string;
  date: string;
  distance?: string;
  packageType?: string;
  weight?: string;
  volume?: string;
  rating?: number;
  transportType?: string;
  nature?: string;
  specialInstructions?: string;
}

export interface Transporter {
  id: string;
  name: string;
  rating: number;
  vehicleType: string;
  distance: string;
  eta: string;
  price: string;
  latitude: number;
  longitude: number;
  available: boolean;
  phone?: string;
  vehicleDetails?: {
    plate: string;
    color: string;
    capacity: string;
  };
}

interface AppContextType {
  // Orders
  orders: Order[];
  activeOrder: Order | null;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  setActiveOrder: (order: Order | null) => void;
  
  // Transporters
  transporters: Transporter[];
  setTransporters: (transporters: Transporter[]) => void;
  updateTransporter: (transporterId: string, updates: Partial<Transporter>) => void;
  
  // Location
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (location: { latitude: number; longitude: number } | null) => void;
  
  // Settings
  settings: {
    locationVisible: boolean;
    notifications: boolean;
    autoAccept?: boolean;
  };
  updateSettings: (newSettings: Partial<typeof settings>) => void;
  
  // Loading states
  isLoadingOrders: boolean;
  isLoadingTransporters: boolean;
  setIsLoadingOrders: (loading: boolean) => void;
  setIsLoadingTransporters: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingTransporters, setIsLoadingTransporters] = useState(false);
  const [settings, setSettings] = useState({
    locationVisible: true,
    notifications: true,
    autoAccept: false,
  });

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
    
    if (activeOrder?.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const updateTransporter = (transporterId: string, updates: Partial<Transporter>) => {
    setTransporters(prev =>
      prev.map(transporter =>
        transporter.id === transporterId ? { ...transporter, ...updates } : transporter
      )
    );
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value: AppContextType = {
    orders,
    activeOrder,
    addOrder,
    updateOrder,
    setActiveOrder,
    transporters,
    setTransporters,
    updateTransporter,
    userLocation,
    setUserLocation,
    settings,
    updateSettings,
    isLoadingOrders,
    isLoadingTransporters,
    setIsLoadingOrders,
    setIsLoadingTransporters,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp doit être utilisé dans un AppProvider');
  }
  return context;
}