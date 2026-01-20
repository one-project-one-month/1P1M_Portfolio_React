import { ArrowRightLeft, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { IdeaEditValues, Leader } from './index';

export default function EditStep2({
  form,
  leaders,
  onBack,
  onNext,
}: {
  form: UseFormReturn<IdeaEditValues>;
  leaders: Leader[];
  onBack: () => void;
  onNext: () => void;
}) {
  const [leaderQuery, setLeaderQuery] = useState('');

  const leaderId = form.watch('leaderId');
  const currentLeader = useMemo(
    () => leaders.find((l) => l.id === leaderId) ?? null,
    [leaders, leaderId],
  );

  const filteredLeaders = useMemo(() => {
    const q = leaderQuery.trim().toLowerCase();
    if (!q) return leaders;
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q),
    );
  }, [leaderQuery, leaders]);

  return (
    <div className="space-y-8">
      <div className="mt-2">
        <h3 className="text-lg">Current Team Leader</h3>
      </div>

      {/* Current leader card */}
      <div className="rounded-2xl border border-[#111827] bg-[#0B1020] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                currentLeader?.avatarUrl ?? 'https://i.pravatar.cc/150?img=13'
              }
              alt="Leader avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-base font-semibold">
                {currentLeader?.name ?? 'No leader selected'}
              </p>
              <p className="text-xs text-[#9CA3AF]">
                {currentLeader?.email ?? '—'}
              </p>
            </div>
          </div>

          <p className="text-sm text-[#9CA3AF]">{currentLeader?.role ?? ''}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          className="h-11 w-full rounded-md border border-[#1F2937] bg-black/20 px-4 pr-10 text-sm text-white placeholder:text-[#6B7280] outline-none focus:border-[#A855F7]"
          placeholder="Search name to swap leader"
          value={leaderQuery}
          onChange={(e) => setLeaderQuery(e.target.value)}
        />
        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A855F7]" />
      </div>

      {/* Results list */}
      <Controller
        control={form.control}
        name="leaderId"
        rules={{ validate: (v) => (v ? true : 'Select a leader') }}
        render={({ field, fieldState }) => (
          <div>
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {filteredLeaders.map((leader) => {
                const selected = field.value === leader.id;

                return (
                  <button
                    key={leader.id}
                    type="button"
                    className={`w-full rounded-md cursor-default border px-4 py-3 text-left ${
                      selected
                        ? 'border-[#A855F7] bg-[#0B1020]'
                        : 'border-[#1F2937] bg-black/20 hover:border-[#374151]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            leader.avatarUrl ??
                            'https://i.pravatar.cc/150?img=14'
                          }
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold">{leader.name}</p>
                          <p className="text-xs text-[#9CA3AF]">
                            {leader.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#9CA3AF]">
                          {leader.role}
                        </span>
                        <ArrowRightLeft
                          className="h-5 w-5 text-[#A855F7] cursor-pointer"
                          onClick={() => field.onChange(leader.id)}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {fieldState.error?.message && (
              <p className="mt-3 text-sm font-bold text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="mt-8 flex items-center justify-between gap-6">
        <Button
          type="button"
          variant="primary"
          size="primary"
          className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          type="button"
          variant="primary"
          size="primary"
          className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
