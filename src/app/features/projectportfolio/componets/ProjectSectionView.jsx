import React from 'react'
import ProjectList from './ProjectList'
import Pagination from '@/components/ui/Pagination'

const ProjectSectionView = ({projects,totalPages,currentPage,onPageChange,isLoading}) => {
  return (
    <>
    <ProjectList projects={projects} isLoading={isLoading}/>

    {totalPages >1 &&  <Pagination currentPage={currentPage} 
    totalPages={totalPages} onPageChange={onPageChange}/>}
   
    
    </>
  )
}

export default ProjectSectionView