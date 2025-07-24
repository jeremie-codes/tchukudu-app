import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface pour les profils client (représente la table client_profiles)
export interface ClientProfile {
  id: string;
  user_id: string; // Clé étrangère vers la table users
  address?: string;
  preferences?: {
    favoriteTransporters?: string[];
    defaultAddresses?: {
      home?: string;
      work?: string;
    };
    // Les méthodes de paiement sauvegardées par l'utilisateur pourraient être ici
    // ou dans une table séparée (UserPaymentMethod)
  };
  stats?: {
    total_orders: number; // Renommé en snake_case
    completed_orders: number; // Renommé en snake_case
    rating: number;
  };
  created_at?: string;
  updated_at?: string;
}

// Interface pour les profils transporteur (représente la table transporter_profiles)
export interface TransporterProfile {
  id: string;
  user_id: string; // Clé étrangère vers la table users
  vehicle_info: { // Renommé en snake_case
    type: string;
    plate: string;
    color: string;
    capacity: string;
    year?: string;
    photo?: string;
    brand?: string;
  };
  verification_status?: { // Renommé en snake_case
    identity: boolean;
    vehicle: boolean;
    license: boolean;
  };
  stats?: {
    completion_rate: number; // Renommé en snake_case
    response_time: string; // Renommé en snake_case
    total_deliveries: number; // Renommé en snake_case
    total_earnings?: string; // Renommé en snake_case
  };
  rating?: number;
  total_rides?: number; // Renommé en snake_case
  join_date?: string; // Renommé en snake_case
  phone?: string;
  email?: string;
  photo?: string; // Photo de profil du transporteur
  reviews?: Array<{ // Les avis pourraient être dans une table séparée (reviews)
    id: string;
    client_name: string; // Renommé en snake_case
    rating: number;
    comment: string;
    date: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

// Interface pour les commandes (représente la table orders)
export interface Order {
  id: string;
  client_id: string; // Clé étrangère vers la table users (rôle client)
  transporter_id?: string; // Clé étrangère vers la table users (rôle transporteur)
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'cancelled';
  pickup_address: string; // Renommé en snake_case
  destination_address: string; // Renommé en snake_case
  price: string; // Considérez 'number' et une devise séparée pour la base de données
  order_date: string; // Renommé en snake_case
  distance?: string;
  package_type?: string; // Renommé en snake_case
  weight?: string;
  volume?: string;
  rating?: number; // Note donnée par le client pour cette commande spécifique
  transport_type?: string; // Renommé en snake_case
  package_nature?: string; // Renommé en snake_case
  special_instructions?: string; // Renommé en snake_case
  urgency?: 'standard' | 'express';
  estimated_delivery_time?: string; // Renommé en snake_case
  actual_delivery_time?: string; // Renommé en snake_case
  client_phone?: string; // Peut être redondant si client_id est utilisé pour récupérer les détails
  payment_method?: string;
  payment_status?: 'pending' | 'paid' | 'failed';
  tracking_code?: string; // Renommé en snake_case
  cancellation_reason?: string; // Renommé en snake_case
  cancellation_fee?: string; // Renommé en snake_case
  created_at?: string;
  updated_at?: string;
}

// Interface pour les notifications (représente la table notifications)
export interface Notification {
  id: string;
  user_id: string; // Clé étrangère vers la table users
  type: 'order_update' | 'payment' | 'rating' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string; // Format ISO string
  read: boolean;
  data?: any; // Pour des données structurées additionnelles
  created_at?: string;
  updated_at?: string;
}

// Interface pour les méthodes de paiement disponibles (pas une table de BDD pour les méthodes sauvegardées)
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile_money' | 'card';
  description: string;
  isAvailable: boolean;
}


// Interface pour les abonnements des utilisateurs (représente la table subscriptions)
export interface Subscription {
  id: string;
  user_id: string; // Clé étrangère vers la table users (rôle transporteur)
  subscription_plan_id: string; // Clé étrangère vers la table subscription_plans
  starts_at: string; // Date de début de l'abonnement
  ends_at: string; // Date de fin de l'abonnement
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  payment_method: string;
  transaction_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface AppContextType {
  // Orders
  orders: Order[];
  activeOrder: Order | null;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  setActiveOrder: (order: Order | null) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  
  // Transporters
  transporters: TransporterProfile[]; // Utilise TransporterProfile
  nearbyTransporters: TransporterProfile[]; // Utilise TransporterProfile
  setTransporters: (transporters: TransporterProfile[]) => void; // Utilise TransporterProfile
  setNearbyTransporters: (transporters: TransporterProfile[]) => void; // Utilise TransporterProfile
  updateTransporter: (transporterId: string, updates: Partial<TransporterProfile>) => void; // Utilise TransporterProfile
  getTransporterById: (id: string) => TransporterProfile | undefined; // Utilise TransporterProfile
  
  // Location
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (location: { latitude: number; longitude: number } | null) => void;
  
  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'created_at' | 'updated_at'>) => void; // Ajusté pour les nouveaux champs
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Payment
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  selectedPaymentMethod: PaymentMethod | null;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
  
  // Search and filters
  searchFilters: {
    transportType?: string;
    maxDistance?: number;
    minRating?: number;
    maxPrice?: number;
    urgency?: 'standard' | 'express';
  };
  updateSearchFilters: (filters: Partial<typeof searchFilters>) => void;
  clearSearchFilters: () => void;
  
  // Settings
  settings: {
    locationVisible: boolean;
    notifications: boolean;
    canBeContacted: boolean;
    autoAccept?: boolean;
    language: 'fr' | 'en';
    currency: 'FC' | 'USD';
    theme: 'light' | 'dark';
  };
  updateSettings: (newSettings: Partial<typeof settings>) => void;
  
  // Loading states
  isLoadingOrders: boolean;
  isLoadingTransporters: boolean;
  isLoadingPayment: boolean;
  setIsLoadingOrders: (loading: boolean) => void;
  setIsLoadingTransporters: (loading: boolean) => void;
  setIsLoadingPayment: (loading: boolean) => void;
  
  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [transporters, setTransporters] = useState<TransporterProfile[]>([]); // Utilise TransporterProfile
  const [nearbyTransporters, setNearbyTransporters] = useState<TransporterProfile[]>([]); // Utilise TransporterProfile
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'orange_money',
      name: 'Orange Money',
      type: 'mobile_money',
      description: 'Paiement via Orange Money',
      icon: 'smartphone',
      isAvailable: true
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      type: 'mobile_money',
      description: 'Paiement via M-Pesa',
      icon: 'smartphone',
      isAvailable: true
    },
    {
      id: 'airtel_money',
      name: 'Airtel Money',
      type: 'mobile_money',
      description: 'Paiement via Airtel Money',
      icon: 'smartphone',
      isAvailable: true
    },
    {
      id: 'card',
      name: 'Carte bancaire',
      type: 'card',
      description: 'Visa, Mastercard',
      icon: 'credit-card',
      isAvailable: true
    }
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingTransporters, setIsLoadingTransporters] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    locationVisible: true,
    notifications: true,
    canBeContacted: true,
    autoAccept: false,
    language: 'fr' as const,
    currency: 'FC' as const,
    theme: 'light' as const,
  });

  const addOrder = (order: Order) => {
    const newOrder = {
      ...order,
      id: order.id || Date.now().toString(),
      order_date: order.order_date || new Date().toISOString(), // Utilise order_date
      status: order.status || 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    
    // Add notification for new order
    addNotification({
      user_id: order.client_id, // Assurez-vous que l'ID utilisateur est disponible
      type: 'order_update',
      title: 'Nouvelle commande',
      message: `Votre commande vers ${order.destination_address} a été créée`, // Utilise destination_address
      read: false
    });
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

    // Add notification for order updates
    if (updates.status) {
      const statusMessages = {
        accepted: 'Votre commande a été acceptée',
        in_progress: 'Votre commande est en cours de livraison',
        delivered: 'Votre commande a été livrée',
        cancelled: 'Votre commande a été annulée'
      };
      
      if (statusMessages[updates.status]) {
        // Nécessite l'ID utilisateur pour la notification
        const order = orders.find(o => o.id === orderId);
        if (order) {
          addNotification({
            user_id: order.client_id,
            type: 'order_update',
            title: 'Mise à jour de commande',
            message: statusMessages[updates.status],
            read: false
          });
        }
      }
    }
  };

  const cancelOrder = (orderId: string, reason: string) => {
    updateOrder(orderId, { 
      status: 'cancelled', 
      cancellation_reason: reason, // Utilise cancellation_reason
      cancellation_fee: reason === 'retard' ? '0 FC' : '400 FC' // Utilise cancellation_fee
    });
  };

  const updateTransporter = (transporterId: string, updates: Partial<TransporterProfile>) => { // Utilise TransporterProfile
    setTransporters(prev =>
      prev.map(transporter =>
        transporter.id === transporterId ? { ...transporter, ...updates } : transporter
      )
    );
    
    setNearbyTransporters(prev =>
      prev.map(transporter =>
        transporter.id === transporterId ? { ...transporter, ...updates } : transporter
      )
    );
  };

  const getTransporterById = (id: string): TransporterProfile | undefined => { // Utilise TransporterProfile
    return transporters.find(t => t.id === id) || nearbyTransporters.find(t => t.id === id);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'created_at' | 'updated_at'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const updateSearchFilters = (filters: Partial<typeof searchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const clearSearchFilters = () => {
    setSearchFilters({});
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const clearError = () => {
    setError(null);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const value: AppContextType = {
    orders,
    activeOrder,
    addOrder,
    updateOrder,
    setActiveOrder,
    cancelOrder,
    transporters,
    nearbyTransporters,
    setTransporters,
    setNearbyTransporters,
    updateTransporter,
    getTransporterById,
    userLocation,
    setUserLocation,
    notifications,
    unreadNotificationsCount,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    paymentMethods,
    setPaymentMethods,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    searchFilters,
    updateSearchFilters,
    clearSearchFilters,
    settings,
    updateSettings,
    isLoadingOrders,
    isLoadingTransporters,
    isLoadingPayment,
    setIsLoadingOrders,
    setIsLoadingTransporters,
    setIsLoadingPayment,
    error,
    setError,
    clearError,
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