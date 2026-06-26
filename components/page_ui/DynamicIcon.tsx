import { type LucideProps } from "lucide-react";
import {
  Building2, Ruler, ClipboardList, Armchair, Package, ShieldCheck,
  Home, Hotel, Map, Trees, Landmark, Building, Globe,
  Star, Heart, Zap, Sun, Moon, Compass, MapPin,
  Phone, Mail, MessageCircle, HelpCircle, Info, AlertCircle,
  CheckCircle, ArrowRight, ArrowLeft, ChevronRight, ChevronDown,
  Menu, X, Search, Settings, Users, User, Calendar,
  Clock, DollarSign, ShoppingCart, Camera, Image, Video,
  Music, FileText, BookOpen, Award, Target, TrendingUp,
  BarChart, PieChart, Layout, Grid, List, Square, Circle,
  Activity, RefreshCw, Share2, Download, Upload, Trash2,
  Edit, Plus, Minus, MoreHorizontal, MoreVertical, Link,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Building2, Ruler, ClipboardList, Armchair, Package, ShieldCheck,
  Home, Hotel, Map, Trees, Landmark, Building, Globe,
  Star, Heart, Zap, Sun, Moon, Compass, MapPin,
  Phone, Mail, MessageCircle, HelpCircle, Info, AlertCircle,
  CheckCircle, ArrowRight, ArrowLeft, ChevronRight, ChevronDown,
  Menu, X, Search, Settings, Users, User, Calendar,
  Clock, DollarSign, ShoppingCart, Camera, Image, Video,
  Music, FileText, BookOpen, Award, Target, TrendingUp,
  BarChart, PieChart, Layout, Grid, List, Square, Circle,
  Activity, RefreshCw, Share2, Download, Upload, Trash2,
  Edit, Plus, Minus, MoreHorizontal, MoreVertical, Link,
};

interface DynamicIconProps extends LucideProps {
  name: string;
  fallback?: React.ComponentType<LucideProps>;
}

export function DynamicIcon({ name, fallback: Fallback, ...props }: DynamicIconProps) {
  const key = name.charAt(0).toUpperCase() + name.slice(1).trim();
  const Icon = ICON_MAP[key];
  if (Icon) return <Icon {...props} />;
  if (Fallback) return <Fallback {...props} />;
  return null;
}