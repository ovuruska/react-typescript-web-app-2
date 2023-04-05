import React from 'react'
import useAllBranches from "@hooks/useAllBranches";
import {BranchEntity} from "@domain/types/common/branch";
import DropdownBtnBottomDrawer from "@features/select-branch/dropdown-btn-bottom-drawer";

interface SelectBranchProps {
  // onClick
  onSelect?: (branch: BranchEntity) => void;
  width?: string;
}


const SelectBranch: React.FC<SelectBranchProps> = ({
                                                     width, onSelect
                                                   }) => {

  const allBranches: BranchEntity[] = useAllBranches();
  return <DropdownBtnBottomDrawer onSelect={console.log} label={"Select Store"} options={allBranches} />

}

export default SelectBranch
