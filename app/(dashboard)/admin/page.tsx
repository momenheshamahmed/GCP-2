"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Building2,
  Gem,
  Bell,
  Settings,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";

// Dashboard stats
const stats = [
  {
    title: "Total Users",
    value: "2,456",
    change: 12.5,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Active Tenders",
    value: "24",
    change: 8.2,
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Investment Value",
    value: "SAR 125B",
    change: -2.4,
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Companies",
    value: "156",
    change: 5.7,
    icon: Building2,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

// Recent activities
const recentActivities = [
  {
    id: 1,
    user: "Ahmed Al-Saud",
    action: "submitted a tender application",
    time: "5 min ago",
    avatar: "/avatars/1.jpg",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "registered a new company",
    time: "15 min ago",
    avatar: "/avatars/2.jpg",
  },
  {
    id: 3,
    user: "Mohammed Ibrahim",
    action: "updated mineral data",
    time: "1 hour ago",
    avatar: "/avatars/3.jpg",
  },
  {
    id: 4,
    user: "Lisa Chen",
    action: "submitted investment inquiry",
    time: "2 hours ago",
    avatar: "/avatars/4.jpg",
  },
  {
    id: 5,
    user: "Omar Hassan",
    action: "completed KYC verification",
    time: "3 hours ago",
    avatar: "/avatars/5.jpg",
  },
];

// Pending approvals
const pendingApprovals = [
  {
    id: 1,
    type: "Company Registration",
    name: "Gulf Mining Corp",
    submitted: "Dec 15, 2024",
    status: "pending",
  },
  {
    id: 2,
    type: "License Application",
    name: "Exploration License #456",
    submitted: "Dec 14, 2024",
    status: "review",
  },
  {
    id: 3,
    type: "Investment Inquiry",
    name: "Gold Mining JV",
    submitted: "Dec 13, 2024",
    status: "pending",
  },
];

// Chart data
const monthlyData = [
  { label: "Jul", value: 45, color: "#006C35" },
  { label: "Aug", value: 52, color: "#006C35" },
  { label: "Sep", value: 48, color: "#006C35" },
  { label: "Oct", value: 61, color: "#006C35" },
  { label: "Nov", value: 55, color: "#006C35" },
  { label: "Dec", value: 67, color: "#D4AF37" },
];

const categoryData = [
  { label: "Exploration", value: 42, color: "#006C35" },
  { label: "Mining", value: 28, color: "#D4AF37" },
  { label: "Processing", value: 18, color: "#3B82F6" },
  { label: "Infrastructure", value: 12, color: "#8B5CF6" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-saudi-green-900 text-white hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-saudi-green-700">
            <div className="w-10 h-10 rounded-xl bg-saudi-gold-500 flex items-center justify-center">
              <Gem className="w-5 h-5 text-saudi-green-900" />
            </div>
            <div>
              <span className="text-lg font-bold">Mining Admin</span>
              <span className="block text-xs text-saudi-green-300">Dashboard</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true },
              { icon: Users, label: "Users" },
              { icon: FileText, label: "Tenders" },
              { icon: Building2, label: "Companies" },
              { icon: Gem, label: "Minerals" },
              { icon: TrendingUp, label: "Investments" },
              { icon: Bell, label: "Notifications", badge: 3 },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-white/10 text-white"
                    : "text-saudi-green-200 hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge className="bg-saudi-gold-500 text-saudi-green-900">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="border-t border-saudi-green-700 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback className="bg-saudi-gold-500 text-saudi-green-900">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-saudi-green-300 truncate">
                  admin@saudimining.sa
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here's what's happening.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="saudi">Generate Report</Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.change > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              stat.change > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {Math.abs(stat.change)}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart data={monthlyData} height={250} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Projects by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonutChart
                    data={categoryData}
                    size={180}
                    centerLabel="Total"
                    centerValue="100"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Lower Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Avatar>
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback>
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              <span className="text-muted-foreground">
                                {activity.action}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Pending Approvals</CardTitle>
                  <Badge variant="saudi">{pendingApprovals.length}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            variant={
                              item.status === "pending" ? "gold" : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.submitted}
                          </span>
                        </div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="saudi" className="flex-1">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

