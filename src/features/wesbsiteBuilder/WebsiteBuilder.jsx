/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Stack, Box } from '@chakra-ui/react';
import { CgListTree } from 'react-icons/cg';
import { AiTwotoneBuild } from 'react-icons/ai';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRequest } from 'redux-query-react';
import { useParams } from 'react-router-dom';
import HtmlContainer from './components/HtmlContainer';
import CssConatainer from './components/CssConatainer';
import ViewerContainer from './components/ViewerContainer';
import Hirearchy from './components/HirearchyViewer';
import { getProjectByIdQuery } from './Store/queries';
import { getProject } from './Store/selectors';
import Editor from './components/Editor';
import { insertNode, getNodeByType } from './components/helpers';

const views = [{ icon: <AiTwotoneBuild />, label: 'build' }, { icon: <CgListTree />, label: 'hirearchy' }];

export default function WebsiteBuilder() {
  const { id } = useParams();
  const project = useSelector(getProject);
  useRequest(getProjectByIdQuery(id));
  const [view, setView] = React.useState(views[0].label);
  const [node, setNode] = useState({ value: '1', type: 'body', label: 'root' });
  const [fileId, setFileId] = useState();
  const [fileLink, setFileLink] = useState();

  useEffect(() => {
    if (project) {
      const { siteObj } = project?.site || {};
      setNode(siteObj);
      setFileId(project.site.fileId);
      setFileLink(project.data.fileLink);
    }
  }, [project]);
  const [selectedNode, setSelectedNode] = useState({});
  const [selectedNodeEle, setSelectedNodeEle] = useState(null);
  const [currentStyleObj, setCurrentStyleObj] = useState({});
  const [currentAttributeObj, setCurrentAttributeObj] = useState({});
  const [currentBetweenTags, setCurrentBetweenTags] = useState('');

  useEffect(() => {
    const { styles, attributes } = selectedNode;
    setCurrentStyleObj({ ...styles } || {});
    setCurrentAttributeObj({ ...attributes } || {});
    setCurrentBetweenTags(selectedNode.betweenTags || '');
  }, [selectedNode]);

  const handleApplyStyles = () => {
    console.log(currentStyleObj);
    selectedNode.styles = currentStyleObj;
    selectedNode.attributes = currentAttributeObj;
    selectedNode.betweenTags = currentBetweenTags;
    setNode(node);
  };

  const handleCurrentNodeSelected = (e, nodeEle) => {
    e.stopPropagation();
    if (selectedNodeEle?.target?.style) {
      selectedNodeEle.target.style.border = '1px dashed black';
    }
    e.target.style.border = '2px dashed blue';
    if (!nodeEle?.styles) {
      nodeEle.styles = {};
    }
    setSelectedNodeEle(e);
    setSelectedNode(nodeEle);
  };

  const handleNodeDrop = useCallback(
    (item) => {
      console.log('handleNodeDrop', node);
      setNode(insertNode(node, getNodeByType(item.type), '1'));
    },
    [node],
  );

  const handleStyleObjChange = ({ e, key }) => {
    if (currentStyleObj) {
      currentStyleObj[key] = e.target.value;
      setCurrentStyleObj({ ...currentStyleObj });
    }
  };

  const handleAttributeChange = ({ value, key }) => {
    if (currentAttributeObj) {
      currentAttributeObj[key] = value;
      setCurrentAttributeObj({ ...currentAttributeObj });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Stack height="90vh" background="gray.50" direction={{ md: 'column', lg: 'row' }}>
        <Box p={2} bg="white" boxShadow="lg" margin="2">
          <ViewerContainer views={views} setView={setView} />
        </Box>
        <Box flex={1} boxShadow="lg" bg="white" mt="2" p="2">
          {view === 'build' ? <HtmlContainer /> : <Hirearchy node={node} setNode={setNode} />}
        </Box>
        {view === 'build'
        && (
        <Box flex={3} p="2">
          <Editor
            node={node}
            setNode={setNode}
            fileId={fileId}
            fileLink={fileLink}
            handleNodeDrop={handleNodeDrop}
            handleCurrentNodeSelected={handleCurrentNodeSelected}
          />
        </Box>
        )}
        <Box flex={1} boxShadow="lg" bg="white" mt="2" p="2" overflowY="scroll">
          <CssConatainer
            selectedNodeStylesObj={currentStyleObj || {}}
            selectedNodeAttributes={currentAttributeObj || {}}
            selectedBetweenTags={currentBetweenTags}
            applyStyles={handleApplyStyles}
            handleStlyeObjChange={handleStyleObjChange}
            handleAttributeChange={handleAttributeChange}
            handleBetweenTagsChange={(e) => setCurrentBetweenTags(e.target.value)}
          />
        </Box>
      </Stack>
    </DndProvider>
  );
}
