"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Generic interfaces for flexible data handling
interface BaseReportItem {
  id: string | number;
  name: string;
}

interface ReportData<T extends BaseReportItem> {
  title: string;
  description?: string;
  items: T[];
  dateGenerated: Date;
}

interface ReportConfig<T extends BaseReportItem> {
  groupBy?: keyof T;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
  filterBy?: Partial<T>;
  chartType?: "bar" | "pie";
}

interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
}

// Sample data interfaces extending BaseReportItem
interface SalesData extends BaseReportItem {
  name: string;
  revenue: number;
  region: string;
  quarter: string;
  salesRep: string;
}

interface UserData extends BaseReportItem {
  name: string;
  registrationDate: string;
  subscriptionType: "free" | "premium" | "enterprise";
  activityScore: number;
  department: string;
}

// Generic Report Component
interface ReportProps<T extends BaseReportItem> {
  data: ReportData<T>;
  config: ReportConfig<T>;
  onConfigChange: (config: ReportConfig<T>) => void;
}

function GenericReport<T extends BaseReportItem>({
  data,
  config,
  onConfigChange,
}: ReportProps<T>) {
  // Generic data processing
  const processedData = useMemo(() => {
    let items = [...data.items];

    // Apply filtering
    if (config.filterBy) {
      items = items.filter((item) => {
        return Object.entries(config.filterBy!).every(([key, value]) => {
          return item[key as keyof T] === value;
        });
      });
    }

    // Apply sorting
    if (config.sortBy) {
      items.sort((a, b) => {
        const aVal = a[config.sortBy!];
        const bVal = b[config.sortBy!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return config.sortOrder === "desc" ? -comparison : comparison;
      });
    }

    return items;
  }, [data.items, config.filterBy, config.sortBy, config.sortOrder]);

  // Generic chart data preparation
  const chartData: ChartDataItem[] = useMemo(() => {
    if (!config.groupBy) return [];

    const grouped = processedData.reduce((acc, item) => {
      const key = String(item[config.groupBy!]);
      if (!acc[key]) {
        acc[key] = { name: key, value: 0 };
      }

      // Try to find a numeric field to sum
      const numericValue =
        (Object.values(item).find(
          (val) => typeof val === "number" && !isNaN(val)
        ) as number) || 1;

      acc[key].value += numericValue;
      return acc;
    }, {} as Record<string, ChartDataItem>);

    return Object.values(grouped);
  }, [processedData, config.groupBy]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          {data.description && (
            <p className="text-gray-600 mt-1">{data.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Generated: {data.dateGenerated.toLocaleDateString()} | Total Items:{" "}
            {processedData.length}
          </p>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex flex-wrap gap-4">
            <select
              value={(config.sortBy as string) || ""}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  sortBy: e.target.value as keyof T,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Sort by...</option>
              {Object.keys(data.items[0] || {}).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <select
              value={config.sortOrder || "asc"}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  sortOrder: e.target.value as "asc" | "desc",
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <select
              value={(config.groupBy as string) || ""}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  groupBy: e.target.value as keyof T,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Group by...</option>
              {Object.keys(data.items[0] || {}).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <select
              value={config.chartType || "bar"}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  chartType: e.target.value as "bar" | "pie",
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        {config.groupBy && chartData.length > 0 && (
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold mb-4">
              {String(config.groupBy)} Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {config.chartType === "pie" ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(processedData[0] || {}).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedData.slice(0, 10).map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {Object.entries(item).map(([key, value]) => (
                      <td
                        key={key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {processedData.length > 10 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing first 10 of {processedData.length} items
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component demonstrating usage
export default function App() {
  // Sample sales data
  const salesData: ReportData<SalesData> = {
    title: "Sales Performance Report",
    description: "Quarterly sales data by region and representative",
    dateGenerated: new Date(),
    items: [
      {
        id: 1,
        name: "Q1 North Sales",
        revenue: 125000,
        region: "North",
        quarter: "Q1",
        salesRep: "Alice Johnson",
      },
      {
        id: 2,
        name: "Q1 South Sales",
        revenue: 98000,
        region: "South",
        quarter: "Q1",
        salesRep: "Bob Smith",
      },
      {
        id: 3,
        name: "Q2 North Sales",
        revenue: 142000,
        region: "North",
        quarter: "Q2",
        salesRep: "Alice Johnson",
      },
      {
        id: 4,
        name: "Q2 South Sales",
        revenue: 87000,
        region: "South",
        quarter: "Q2",
        salesRep: "Bob Smith",
      },
      {
        id: 5,
        name: "Q1 East Sales",
        revenue: 156000,
        region: "East",
        quarter: "Q1",
        salesRep: "Carol Davis",
      },
      {
        id: 6,
        name: "Q2 East Sales",
        revenue: 178000,
        region: "East",
        quarter: "Q2",
        salesRep: "Carol Davis",
      },
    ],
  };

  // Sample user data
  const userData: ReportData<UserData> = {
    title: "User Activity Report",
    description: "User engagement and subscription analysis",
    dateGenerated: new Date(),
    items: [
      {
        id: 1,
        name: "John Doe",
        registrationDate: "2024-01-15",
        subscriptionType: "premium",
        activityScore: 85,
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        registrationDate: "2024-02-20",
        subscriptionType: "free",
        activityScore: 45,
        department: "Marketing",
      },
      {
        id: 3,
        name: "Mike Johnson",
        registrationDate: "2024-01-30",
        subscriptionType: "enterprise",
        activityScore: 92,
        department: "Sales",
      },
      {
        id: 4,
        name: "Sarah Wilson",
        registrationDate: "2024-03-10",
        subscriptionType: "premium",
        activityScore: 78,
        department: "Engineering",
      },
      {
        id: 5,
        name: "David Brown",
        registrationDate: "2024-02-05",
        subscriptionType: "free",
        activityScore: 32,
        department: "Marketing",
      },
    ],
  };

  const [activeReport, setActiveReport] = useState<"sales" | "users">("sales");
  const [salesConfig, setSalesConfig] = useState<ReportConfig<SalesData>>({
    groupBy: "region",
    chartType: "bar",
    sortBy: "revenue",
    sortOrder: "desc",
  });

  const [userConfig, setUserConfig] = useState<ReportConfig<UserData>>({
    groupBy: "subscriptionType",
    chartType: "pie",
    sortBy: "activityScore",
    sortOrder: "desc",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Report Selector */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveReport("sales")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeReport === "sales"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sales Report
            </button>
            <button
              onClick={() => setActiveReport("users")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeReport === "users"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              User Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {activeReport === "sales" ? (
        <GenericReport
          data={salesData}
          config={salesConfig}
          onConfigChange={setSalesConfig}
        />
      ) : (
        <GenericReport
          data={userData}
          config={userConfig}
          onConfigChange={setUserConfig}
        />
      )}
    </div>
  );
}
