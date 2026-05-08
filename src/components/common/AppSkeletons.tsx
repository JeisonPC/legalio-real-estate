const skeletonBlock = {
  background: "#f1f2f0",
  borderRadius: 6,
} as const;

export function SkeletonLine({
  width,
  height = 16,
}: {
  width: string | number;
  height?: number;
}) {
  return <div style={{ ...skeletonBlock, width, height }} />;
}

export function HomeHeroSkeleton() {
  return (
    <div className="page-title style-5 sw-layout">
      <div className="flat-tab flat-tab-form">
        <div className="tf-container">
          <div className="nav-tab-form style-1 justify-content-center d-flex">
            <SkeletonLine width={120} height={48} />
            <div style={{ width: 8 }} />
            <SkeletonLine width={96} height={48} />
          </div>
          <div className="wg-filter">
            <div className="widget-content-inner active">
              <div className="form-title">
                <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                      <SkeletonLine width={110} height={15} />
                      <div style={{ height: 8 }} />
                      <SkeletonLine width="100%" height={54} />
                    </div>
                  ))}
                </div>
                <div className="wrap-btn">
                  <SkeletonLine width={54} height={54} />
                  <SkeletonLine width={132} height={54} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePropertiesSkeleton() {
  return (
    <div className="tf-spacing-1">
      <div className="tf-container">
        <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
          <div>
            <SkeletonLine width={160} height={16} />
            <div style={{ height: 12 }} />
            <SkeletonLine width={280} height={34} />
          </div>
          <SkeletonLine width={180} height={52} />
        </div>
        <div className="tf-grid-layout md-col-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card-house style-default">
              <SkeletonLine width="100%" height={278} />
              <div style={{ height: 20 }} />
              <SkeletonLine width="46%" height={28} />
              <div style={{ height: 12 }} />
              <SkeletonLine width="76%" height={22} />
              <div style={{ height: 10 }} />
              <SkeletonLine width="58%" height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <HomeHeroSkeleton />
      <HomePropertiesSkeleton />
    </>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: -9999,
        top: -9999,
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    />
  );
}
