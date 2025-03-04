import SeasonsTable from '@/components/Seasons/SeasonsTable';

export default function SeasonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Survivor Seasons</h1>
      <SeasonsTable />
    </div>
  );
}