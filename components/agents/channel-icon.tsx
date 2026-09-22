import {
  MessageCircle,
  Instagram,
  Facebook,
  Send,
  Globe,
  LayoutGrid,
  Mail,
  Code2,
} from "lucide-react"
import type { ChannelId } from "./types"

const ICONS: Record<ChannelId, typeof MessageCircle> = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  messenger: Facebook,
  telegram: Send,
  site: Globe,
  widget: LayoutGrid,
  email: Mail,
  api: Code2,
}

export function ChannelIcon({
  id,
  className,
}: {
  id: ChannelId
  className?: string
}) {
  const Icon = ICONS[id]
  return <Icon className={className} />
}
