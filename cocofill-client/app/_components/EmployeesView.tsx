"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Employee } from "../_types/employee";

const EmployeesView = () => {
  //リファクタ必須
  const [employees, setEmployees] = useState<Employee[]>([]);
  // const [error, setError] = useState<string | null>(null); //error使われてない

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (err) {
        const errorMessage = (err as Error).message; //as ErrorにすることでError型というのを明示的に示している
        // setError(errorMessage);
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
            <Typography fontSize={12}>ID : {employee.id}</Typography>
            <Typography fontSize={16}>{employee.name}</Typography>
            <Typography variant="body2">
              週{employee.work_style_week}日出勤希望
            </Typography>
            <Typography variant="body2">
              平日：{employee.weekday_off_requests}回休み希望
            </Typography>
            <Typography variant="body2">
              休日：{employee.weekend_off_requests}回休み希望
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
export default EmployeesView;
