import React from 'react'
import useAllGroomers from "@hooks/useAllGroomers";
import {EmployeeEntity} from "@domain/types/common/employee";
import DropdownBottomDrawer, {
  DropdownBottomDrawerItem
} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";

interface SelectBranchProps {
  onSelect?: (branch: EmployeeEntity[]) => void;
}


const SelectBranch: React.FC<SelectBranchProps> = ({
                                                     onSelect
                                                   }) => {

  const [groomers, setGroomers] = React.useState<EmployeeEntity[]>([]);
  const allGroomers: EmployeeEntity[] = useAllGroomers();

  const handleSelect = (branches: EmployeeEntity[]) => {
    setGroomers(branches);
    onSelect && onSelect(branches);
  }

  let label = "Select Groomers";
  if(groomers.length  == 1) {
    label = groomers[0].name;
  }else if(groomers.length > 1){
    label = `${groomers.length} Groomers Selected`;
  }

  const options = allGroomers.map((groomer) => {
    return {
      id: groomer.id,
      title: groomer.name,
      value:groomer
    } as DropdownBottomDrawerItem<EmployeeEntity>
  });

  return <DropdownBottomDrawer onSelect={handleSelect} label={label} options={options}/>

}

export default SelectBranch
