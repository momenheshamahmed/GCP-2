"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Database, MapPin, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  fetchAllGeologicalData, 
  type GeologicalDatasetMetadata, 
  type GeologicalResourcesResponse 
} from "@/lib/api/geological-api";

interface SGSDataPanelProps {
  className?: string;
  compact?: boolean;
}

export function SGSDataPanel({ className, compact = false }: SGSDataPanelProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<GeologicalDatasetMetadata | null>(null);
  const [resources, setResources] = useState<GeologicalResourcesResponse | null>(null);
  const [portalUrl, setPortalUrl] = useState<string>("https://ngdp.sgs.gov.sa/ngp/");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllGeologicalData();
      setMetadata(data.metadata);
      setResources(data.resources);
      setPortalUrl(data.portalUrl);
    } catch (err) {
      setError("Failed to fetch SGS data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (compact) {
    return (
      <div className={className}>
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-saudi-green-500 transition-colors"
        >
          <Database className="w-3 h-3" />
          <span>SGS Geological Database</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-saudi-green-500" />
            Saudi Geological Survey Data
          </CardTitle>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7" 
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {error ? (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        ) : loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading SGS data...
          </div>
        ) : (
          <>
            {metadata && (
              <div className="space-y-2">
                <div className="text-sm font-medium">{metadata.titleEn}</div>
                <div className="text-xs text-muted-foreground">{metadata.titleAr}</div>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="outline" className="text-[10px]">
                    {metadata.providerNameEn}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {metadata.updateFrequency}
                  </Badge>
                  <Badge variant="saudi" className="text-[10px]">
                    {metadata.resourcesCount} Resource{metadata.resourcesCount > 1 ? 's' : ''}
                  </Badge>
                </div>

                {metadata.tags && metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {metadata.tags.slice(0, 5).map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-[9px]">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {resources?.resources && resources.resources.length > 0 && (
              <div className="border-t pt-3 mt-3">
                <div className="text-xs font-medium mb-2">Available Resources:</div>
                {resources.resources.map((resource) => (
                  <div key={resource.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{resource.name}</span>
                      <Badge variant="outline" className="text-[9px]">
                        {resource.format}
                      </Badge>
                    </div>
                    {resource.columns && resource.columns.length > 0 && (
                      <div className="text-[10px] text-muted-foreground">
                        Columns: {resource.columns.map(c => c.name).join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-3 mt-3 space-y-2">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-saudi-green-600 hover:text-saudi-green-700 transition-colors"
              >
                <MapPin className="w-3 h-3" />
                <span>Open NGD Interactive Map Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://open.data.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Database className="w-3 h-3" />
                <span>Saudi Open Data Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {metadata?.updatedAt && (
              <div className="text-[10px] text-muted-foreground border-t pt-2">
                Last updated: {new Date(metadata.updatedAt).toLocaleDateString()}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
