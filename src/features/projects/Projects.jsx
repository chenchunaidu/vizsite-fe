import {
  Stack, Flex, Button, SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { useRequest } from 'redux-query-react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllProjectsQuery } from './Store/queries';
import ProjectCards from './Components/ProjectCards';
import { getAllProjects } from './Store/selectors';
import ProjectsSkeletion from './ProjectsSkeletion';

export default function Projects() {
  const history = useHistory();
  const projects = useSelector(getAllProjects) || [];
  const [
    {
      isPending,
    },
  ] = useRequest(getAllProjectsQuery);

  const handleAddNewProject = () => {
    history.push('/app/projects/new');
  };

  return (
    <Stack my="8" px="36">
      <Stack>
        <Flex justifyContent="flex-end">
          <Button onClick={handleAddNewProject}>
            Add Project
          </Button>
        </Flex>
        <SimpleGrid columns={{ lg: '3', md: '2', sm: '1' }} gap="12">
          {isPending ? <ProjectsSkeletion /> : <ProjectCards projects={projects} />}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
