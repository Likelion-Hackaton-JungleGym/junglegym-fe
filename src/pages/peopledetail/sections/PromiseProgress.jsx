import {
  Card,
  CardTitle,
  CardSubtitle,
  Table,
  TableRow,
  TableCell,
  TableSubRow
} from "../ProfileDetail.styles.js";

const PromiseProgress = ({ progressData }) => (
  <Card>
    <CardTitle>공약 사업 이행 현황</CardTitle>
    <CardSubtitle>공약이행 완료도 2025.08.08 기준</CardSubtitle>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#8B7FF9', borderRadius: '8px', color: 'white', fontWeight: '500' }}>
        완료
        <span style={{ fontWeight: '600' }}>22개</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#B8A9F9', borderRadius: '8px', color: 'white', fontWeight: '500' }}>
        이행후 계속추진
        <span style={{ fontWeight: '600' }}>25개</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#E0E0E0', borderRadius: '8px', color: 'white', fontWeight: '500' }}>
        정상추진
        <span style={{ fontWeight: '600' }}>30개</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#E0E0E0', borderRadius: '8px', color: 'white', fontWeight: '500' }}>
        미이행
        <span style={{ fontWeight: '600' }}>30개</span>
      </div>
    </div>

    <Table>
      <TableRow>
        <TableCell>사업 수</TableCell>
        <TableCell>77개(100%)</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>완료</TableCell>
        <TableCell>
          <TableSubRow>이행 완료: 22개(29%)</TableSubRow>
          <TableSubRow>이행후 계속추진: 25개(32%)</TableSubRow>
          <TableSubRow>소계: 47개(61%)</TableSubRow>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>추진 중</TableCell>
        <TableCell>
          <TableSubRow>정상 추진: 30개(39%)</TableSubRow>
          <TableSubRow>일부 추진: 30개(39%)</TableSubRow>
          <TableSubRow>소계: 30개(39%)</TableSubRow>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>미이행</TableCell>
        <TableCell>
          <TableSubRow>보류: 30개(39%)</TableSubRow>
          <TableSubRow>불이행: 30개(39%)</TableSubRow>
          <TableSubRow>소계: 30개(39%)</TableSubRow>
        </TableCell>
      </TableRow>
    </Table>
  </Card>
);

export default PromiseProgress; 