'use client';

import DesignerCanvas from '../../../components/designer/DesignerCanvas';
import BathroomPlanner from '../../../components/designer/BathroomPlanner';
import { useDesignerStore } from '../../../store/designer.store';

export default function DesignerPage() {
  const { state } = useDesignerStore();
  
  if (state.designType === 'bathroom') {
    return <BathroomPlanner />;
  }
  return <DesignerCanvas />;
}
