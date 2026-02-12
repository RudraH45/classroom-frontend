import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { set } from "date-fns";
import {  Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DEPARTMENTS_OPTIONS } from "@/constants/index.ts";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useTable } from "@refinedev/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";


const SubjectLists = () => {  
    const [searchTerm, setSearchTerm] = useState(" ")  
    const [selectedDepartment, setSelectedDepartment] = useState("all")

    const subjectColumns = useMemo<ColumnDef<Subject>[]>(() => [
        {
            id: "code",
            accessorKey: "code",
            size: 150,
            header: () => <p className="column-title ml-2">Code</p>,
            cell: ({getValue}) => <Badge variant="outline">{getValue<string>()}</Badge>
        },
         {
        id: "name",
        accessorKey: "name",
        size: 200,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => (
          <span className="text-foreground">{getValue<string>()}</span>
        ),
        filterFn: "includesString",
      },
      {
        id: "department",
        accessorKey: "department.name",
        size: 150,
        header: () => <p className="column-title">Department</p>,
        cell: ({ getValue }) => (
          <Badge variant="secondary">{getValue<string>()}</Badge>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        size: 300,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => (
          <span className="truncate line-clamp-2">{getValue<string>()}</span>
        ),
      }
    ], []);

    const departmentFilter = selectedDepartment == "all" ? [] : [
        {
            field: "department",
            operator: "eq" as const,
            value: selectedDepartment,
        },
    ];

    const searchFilter = searchTerm ? [
        {
            field: "name",
            operator: "contains" as const,
            value: searchTerm,
        },
    ] : [];

    const subjectTable = useTable<Subject>({
        columns: subjectColumns,
        refineCoreProps: {
            resource: "subjects",
            pagination: {
                pageSize : 10,
                mode: "server",
            },
            filters: {
                permanent: [...departmentFilter, ...searchFilter],
            },
            sorters: {
                initial: [
                    {
                        field: "id",
                        order: "desc",
                    }
                ],
        }
    }
    })

    return (
        <ListView>
            <Breadcrumb/>
            <h1 className="page-title">Subjects</h1>

            <div className="field">
                <p> Quick access to essential metrics and management tools. </p>

                <div className="actions-row">
                    <div className="search-field">
                       <Search className="search-icon" />
                            <Input 
                               type="text"
                               placeholder="Search subjects..."
                               className="search-input"
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                            />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select 
                        value = {selectedDepartment}
                        onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger className="w-full sm:w-auto"> 
                                <SelectValue placeholder="Filter By Departments" />
                            </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all"> All Departments</SelectItem>
                                        {DEPARTMENTS_OPTIONS.map((department) => (
                                            <SelectItem key= {department.value} value= {department.value}>
                                                        {department.label}
                                            </SelectItem>
                                        ))}                             
                                </SelectContent>                           
                        </Select>
                    </div>
                    <CreateButton resource="/subjects/create" />
                </div>
                
                <DataTable table={subjectTable} />
                
            </div>
        </ListView>
    )
}

export default SubjectLists;