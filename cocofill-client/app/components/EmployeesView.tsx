"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Employee {
  id: number;
  name: string;
  role: string;
  work_style_week: number;
  created_at: string;
  updated_at: string;
  // 他のプロパティがあれば追加
}

export default function EmployeesView() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (err) {
        const errorMessage = (err as Error).message; //as ErrorにすることでError型というのを明示的に示している
        setError(errorMessage);
        console.error("Error fetching employees:", errorMessage);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <Box>
      <Typography fontSize={25}>スタイリスト</Typography>
      {employees.map((employee) => (
        <Card key={employee.id} sx={{ maxWidth: 300, margin: 10 }}>
          <CardContent>
            <Typography fontSize={16}>{employee.name}</Typography>
            <Typography variant="body2">
              {employee.work_style_week}日
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
