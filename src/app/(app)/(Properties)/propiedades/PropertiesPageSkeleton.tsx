const skeletonBlock = {
  background: "#f1f2f0",
  borderRadius: 6,
} as const;

function SkeletonLine({
  width,
  height = 16,
}: {
  width: string | number;
  height?: number;
}) {
  return <div style={{ ...skeletonBlock, width, height }} />;
}

function SkeletonSelect() {
  return (
    <div>
      <SkeletonLine width={112} height={15} />
      <div style={{ height: 8 }} />
      <SkeletonLine width="100%" height={54} />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card-house style-default">
      <div className="img-style mb_20" style={{ height: 258 }}>
        <div style={{ ...skeletonBlock, width: "100%", height: "100%" }} />
      </div>
      <div className="content">
        <div className="mb_12">
          <SkeletonLine width="42%" height={30} />
        </div>
        <div className="mb_8">
          <SkeletonLine width="76%" height={22} />
        </div>
        <div className="mb_20">
          <SkeletonLine width="58%" height={16} />
        </div>
        <ul className="info d-flex">
          <li style={{ flex: 1 }}>
            <SkeletonLine width="86%" height={18} />
          </li>
          <li style={{ flex: 1 }}>
            <SkeletonLine width="82%" height={18} />
          </li>
          <li style={{ flex: 1 }}>
            <SkeletonLine width="78%" height={18} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function PropertiesPageSkeleton() {
  return (
    <div className="main-content" aria-busy="true" aria-live="polite">
        <div className="flat-tab flat-tab-form style-1">
          <div className="tf-container w-1890">
            <div className="wg-filter">
              <div className="widget-content-inner active">
                <div className="form-title">
                  <div className="box tf-grid-layout xl-col-5 md-col-2 gap_20">
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                  </div>
                  <div className="wrap-btn">
                    <div className="btn-filter show-form">
                      <div className="icons">
                        <i className="icon-Faders"></i>
                      </div>
                    </div>
                    <div className="tf-btn btn-px-28 btn-bg-1">
                      <span>Buscar</span>
                      <span className="bg-effect"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wd-search-form">
                <div className="group-select">
                  <div className="tf-grid-layout sm-col-2">
                    <SkeletonSelect />
                    <SkeletonSelect />
                  </div>
                  <div className="tf-grid-layout sm-col-2">
                    <SkeletonSelect />
                    <SkeletonSelect />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper-layout">
          <div className="wrap-left">
            <div className="box-title mb_30">
              <div>
                <div className="mb_4">
                  <SkeletonLine width={156} height={16} />
                </div>
                <SkeletonLine width={220} height={26} />
              </div>
              <div className="right d-flex gap_12">
                <SkeletonLine width={92} height={44} />
                <SkeletonLine width={230} height={44} />
              </div>
            </div>
            <div className="flat-animate-tab">
              <div className="tab-content">
                <div className="tf-grid-layout md-col-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: 30 }}
                >
                  <SkeletonLine width={184} height={42} />
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-right overflow-hidden">
            <div
              style={{
                ...skeletonBlock,
                width: "100%",
                minHeight: 720,
                position: "relative",
              }}
            >
              <div
                style={{
                  ...skeletonBlock,
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 180,
                  height: 42,
                  background: "#ffffff",
                }}
              />
              <div
                style={{
                  ...skeletonBlock,
                  position: "absolute",
                  right: 24,
                  bottom: 24,
                  width: 132,
                  height: 132,
                  background: "#ffffff",
                }}
              />
            </div>
          </div>
        </div>
    </div>
  );
}
