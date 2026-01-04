import React from 'react'
import ProjectList from './ProjectList'
import Pagination from '@/components/ui/Pagination'

const ProjectSectionView = ({projects,totalPages,currentPage,onPageChange}) => {
  return (
    <>
    <ProjectList projects={projects} />

    {totalPages >1 &&  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>}
   
    
    </>
  )
}

export default ProjectSectionView