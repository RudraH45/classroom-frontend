import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { set } from "date-fns";
import {  Search } from "lucide-react";
import { useState } from "react";
import { DEPARTMENTS_OPTIONS } from "@/constants/index.ts";

const SubjectLists = () => {  
    const [searchTerm, setSearchTerm] = useState(" ")  
    const [selectedDepartment, setSelectedDepartment] = useState("all")
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
                </div>
                
            </div>
        </ListView>
    )
}

export default SubjectLists;